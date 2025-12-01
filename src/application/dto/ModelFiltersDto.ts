export interface ModelFiltersDto {
  category?: 'modelo' | 'tradutora' | 'massagista';
  location?: string;
  hasLocation?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

