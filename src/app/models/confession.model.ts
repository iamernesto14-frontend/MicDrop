// src/app/models/confession.model.ts
export interface Confession {
  id: number;
  message: string;
  category: string;
  emotion: string;
  is_approved?: boolean | null;
  created_at: string;
  updated_at: string;
}