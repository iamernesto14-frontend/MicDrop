export interface Playlist {
  id: number;
  name: string;
  title: string;
  description: string;
  episodes: number[];
  created_at?: string;
  updated_at?: string;
}
