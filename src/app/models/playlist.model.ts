export interface Playlist {
  id: number;
  name: string; // used as title
  description: string;
  episodes: number[];
  cover_image?: string;
  created_at?: string;
  updated_at?: string;
}
