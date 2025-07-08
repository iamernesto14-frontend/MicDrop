import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Episode } from '../../models/episode.model';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {
  private baseUrl = `${environment.apiUrl}/episodes`;

  private latestEpisodesCache: Episode[] | null = null;

  constructor(private http: HttpClient) {}

  getEpisodes(): Observable<{ status: string; data: Episode[] }> {
    return this.http.get<{ status: string; data: Episode[] }>(this.baseUrl);
  }

  getEpisodeByIdFromList(id: number): Observable<Episode | null> {
    if (this.latestEpisodesCache) {
      const found = this.latestEpisodesCache.find(ep => ep.id === id) || null;
      return of(found);
    }
  
    // Fetch all episodes (you can limit page size as needed)
    return this.getEpisodes().pipe(
      map(res => {
        const sorted = res.data.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        this.latestEpisodesCache = sorted;
        return sorted.find(ep => ep.id === id) || null;
      })
    );
  }
  

  /**
   * Returns the latest episodes with in-memory caching.
   * @param limit Number of episodes to return (default: 5)
   * @param forceRefresh Whether to bypass cache and fetch from server
   */
  getLatestEpisodes(limit: number = 5, forceRefresh: boolean = false): Observable<Episode[]> {
    if (this.latestEpisodesCache && !forceRefresh) {
      return of(this.latestEpisodesCache.slice(0, limit));
    }

    const url = `${this.baseUrl}?page=1&limit=${limit}`;
    return this.http.get<{ status: string; data: Episode[] }>(url).pipe(
      map((res) => {
        // Optionally sort by createdAt if backend doesn't do it
        const sorted = res.data.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        this.latestEpisodesCache = sorted;
        return sorted.slice(0, limit);
      })
    );
  }

  addEpisode(episode: any): Observable<any> {
    this.clearCache();
    return this.http.post(this.baseUrl, episode);
  }

  updateEpisode(id: number, data: any): Observable<any> {
    this.clearCache();
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteEpisode(id: number): Observable<any> {
    this.clearCache();
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  private clearCache(): void {
    this.latestEpisodesCache = null;
  }
}
