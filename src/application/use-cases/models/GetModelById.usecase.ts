import { IModelRepository } from '@domain/repositories/IModelRepository';
import { Model } from '@domain/entities/Model.entity';
import { NotFoundError } from '@domain/errors/NotFoundError';

export class GetModelByIdUseCase {
  constructor(private readonly modelRepository: IModelRepository) {}

  async execute(id: string): Promise<Model> {
    const model = await this.modelRepository.findById(id);
    
    if (!model) {
      throw new NotFoundError('Model', id);
    }

    return model;
  }
}

