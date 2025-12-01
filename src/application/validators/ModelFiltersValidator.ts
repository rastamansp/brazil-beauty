import { z } from 'zod';
import { ModelFiltersDto } from '../dto/ModelFiltersDto';
import { ModelFilters } from '@domain/repositories/IModelRepository';

export const ModelFiltersSchema = z.object({
  category: z.enum(['modelo', 'tradutora', 'massagista']).optional(),
  location: z.string().min(1).optional(),
  hasLocation: z.boolean().optional(),
  search: z.string().min(1).optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(),
});

export function validateModelFilters(data: unknown): ModelFilters {
  return ModelFiltersSchema.parse(data) as ModelFilters;
}

