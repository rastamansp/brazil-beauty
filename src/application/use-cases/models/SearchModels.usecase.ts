import { IModelRepository } from '@domain/repositories/IModelRepository';
import { Model } from '@domain/entities/Model.entity';

export class SearchModelsUseCase {
  constructor(private readonly modelRepository: IModelRepository) {}

  async execute(query: string): Promise<Model[]> {
    if (!query || query.trim().length === 0) {
      return [];
    }

    return this.modelRepository.search(query.trim());
  }
}

