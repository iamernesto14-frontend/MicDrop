import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Episode } from '../../models/episode.model';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {
  private baseUrl = `${environment.apiUrl}/episodes`;

  constructor(private http: HttpClient) {}

  getEpisodes(): Observable<{ status: string; data: Episode[] }> {
    return this.http.get<{ status: string; data: Episode[] }>(this.baseUrl);
  }

  getEpisodeById(id: number): Observable<{ status: string; data: Episode }> {
    return this.http.get<{ status: string; data: Episode }>(`${this.baseUrl}/${id}`);
  }

  addEpisode(episode: any): Observable<any> {
    return this.http.post(this.baseUrl, episode);
  }

  updateEpisode(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteEpisode(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
