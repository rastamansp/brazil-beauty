import { IModelRepository, ModelFilters } from '@domain/repositories/IModelRepository';
import { Model, ModelSchema } from '@domain/entities/Model.entity';
import { NotFoundError } from '@domain/errors/NotFoundError';
import { ILogger } from '@infrastructure/logging/Logger';

interface ApiModelResponse {
  id: string;
  name: string;
  phone: string;
  location: string;
  hasLocation: boolean;
  category: 'modelo' | 'tradutora' | 'massagista';
  description: string;
  age: number;
  height: string;
  size: string;
  shoes: string;
  hip: string;
  eyeColor: string;
  accompanies: string[];
  fee: string;
  acceptsCard: boolean;
  photos: string[];
  videos: string[] | null;
  instagram: string | null;
  twitter: string | null;
  createdAt?: string;
  updatedAt?: string;
}

interface ApiListResponse {
  data: ApiModelResponse[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface ApiDetailResponse {
  data: ApiModelResponse;
}

export class ModelRepository implements IModelRepository {
  private readonly apiUrl: string;

  constructor(private readonly logger: ILogger) {
    this.apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3007/api';
  }

  private mapApiModelToModel(apiModel: ApiModelResponse): Model {
    return {
      id: apiModel.id,
      name: apiModel.name,
      phone: apiModel.phone,
      location: apiModel.location,
      hasLocation: apiModel.hasLocation,
      category: apiModel.category,
      description: apiModel.description,
      age: apiModel.age,
      height: apiModel.height,
      size: apiModel.size,
      shoes: apiModel.shoes,
      hip: apiModel.hip,
      eyeColor: apiModel.eyeColor,
      accompanies: apiModel.accompanies,
      fee: apiModel.fee,
      acceptsCard: apiModel.acceptsCard,
      photos: apiModel.photos,
      videos: apiModel.videos ?? [],
      instagram: apiModel.instagram,
      twitter: apiModel.twitter,
      createdAt: apiModel.createdAt,
      updatedAt: apiModel.updatedAt,
    };
  }

  private buildQueryParams(filters?: ModelFilters): string {
    if (!filters) return '';

    const params = new URLSearchParams();

    if (filters.category) {
      params.append('category', filters.category);
    }

    if (filters.location) {
      params.append('location', filters.location);
    }

    if (filters.hasLocation !== undefined) {
      params.append('hasLocation', filters.hasLocation.toString());
    }

    if (filters.search) {
      params.append('search', filters.search);
    }

    if (filters.page !== undefined) {
      params.append('page', filters.page.toString());
    }

    if (filters.limit !== undefined) {
      params.append('limit', filters.limit.toString());
    }

    const queryString = params.toString();
    return queryString ? `?${queryString}` : '';
  }

  async findAll(filters?: ModelFilters): Promise<Model[]> {
    this.logger.debug('Finding all models', filters);

    try {
      const queryParams = this.buildQueryParams(filters);
      const url = `${this.apiUrl}/models${queryParams}`;

      this.logger.debug('Fetching models from API', { url });

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        this.logger.error('Failed to fetch models', new Error(`HTTP ${response.status}: ${errorText}`));
        throw new Error(`Erro ao buscar modelos: ${response.status} ${response.statusText}`);
      }

      const apiResponse: ApiListResponse = await response.json();
      const apiModels = apiResponse.data || [];

      // Mapeia e valida os modelos
      const models = apiModels.map((apiModel) => {
        const model = this.mapApiModelToModel(apiModel);
        // Valida com Zod
        return ModelSchema.parse(model);
      });

      this.logger.info('Models fetched successfully', { count: models.length });

      return models;
    } catch (error) {
      this.logger.error('Error fetching models', error as Error);
      throw error;
    }
  }

  async findById(id: string): Promise<Model | null> {
    this.logger.debug('Finding model by id', { id });

    try {
      const url = `${this.apiUrl}/models/${id}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        const errorText = await response.text();
        this.logger.error('Failed to fetch model', new Error(`HTTP ${response.status}: ${errorText}`));
        throw new Error(`Erro ao buscar modelo: ${response.status} ${response.statusText}`);
      }

      const jsonResponse = await response.json();
      
      // A API pode retornar { data: Model } ou Model diretamente
      const apiModel: ApiModelResponse = jsonResponse.data || jsonResponse;
      
      if (!apiModel || !apiModel.id) {
        this.logger.warn('Invalid API response format', { jsonResponse });
        return null;
      }
      
      const model = this.mapApiModelToModel(apiModel);
      const validatedModel = ModelSchema.parse(model);

      this.logger.info('Model fetched successfully', { id });

      return validatedModel;
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        return null;
      }
      this.logger.error('Error fetching model', error as Error);
      throw error;
    }
  }

  async search(query: string): Promise<Model[]> {
    this.logger.debug('Searching models', { query });
    return this.findAll({ search: query });
  }
}

