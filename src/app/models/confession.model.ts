export interface Confession {
  id: number;
  message: string;
  category: string;
  emotion: string;
  is_approved: boolean | null; // null = pending
  created_at: string;
  updated_at: string;
}
