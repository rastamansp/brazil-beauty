import { useQuery } from '@tanstack/react-query';
import { container } from '@shared/di/container';
import { Model } from '@domain/entities/Model.entity';

export const useModelById = (id: string | undefined) => {
  return useQuery<Model>({
    queryKey: ['model', id],
    queryFn: async () => {
      if (!id) {
        throw new Error('ID não fornecido');
      }
      return container.getModelByIdUseCase.execute(id);
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 10, // 10 minutos
    retry: 1,
  });
};

