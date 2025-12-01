import { Model } from '../entities/Model.entity';

export interface ModelFilters {
  category?: 'modelo' | 'tradutora' | 'massagista';
  location?: string;
  hasLocation?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export interface IModelRepository {
  findAll(filters?: ModelFilters): Promise<Model[]>;
  findById(id: string): Promise<Model | null>;
  search(query: string): Promise<Model[]>;
}

