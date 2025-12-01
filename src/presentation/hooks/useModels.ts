import { useQuery } from '@tanstack/react-query';
import { container } from '@shared/di/container';
import { ModelFiltersDto } from '@application/dto/ModelFiltersDto';
import { Model } from '@domain/entities/Model.entity';

export const useModels = (filters?: ModelFiltersDto) => {
  return useQuery<Model[]>({
    queryKey: ['models', filters],
    queryFn: () => container.listModelsUseCase.execute(filters),
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 10, // 10 minutos (antes cacheTime)
  });
};

