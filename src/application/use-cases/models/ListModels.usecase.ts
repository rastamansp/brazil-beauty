import { IModelRepository, ModelFilters } from '@domain/repositories/IModelRepository';
import { Model } from '@domain/entities/Model.entity';
import { ModelFiltersDto } from '../../dto/ModelFiltersDto';
import { validateModelFilters } from '../../validators/ModelFiltersValidator';

export class ListModelsUseCase {
  constructor(private readonly modelRepository: IModelRepository) {}

  async execute(filters?: ModelFiltersDto): Promise<Model[]> {
    const validatedFilters: ModelFilters | undefined = filters
      ? validateModelFilters(filters)
      : undefined;

    return this.modelRepository.findAll(validatedFilters);
  }
}

