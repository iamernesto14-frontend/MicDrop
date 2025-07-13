import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Playlist } from '../../models/playlist.model';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api.response.model';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private apiUrl = `${environment.apiUrl}/playlists`;

  constructor(private http: HttpClient) {}

  getPlaylists(): Observable<ApiResponse<Playlist[]>> {
    return this.http.get<ApiResponse<Playlist[]>>(this.apiUrl);
  }

  createPlaylist(data: Partial<Playlist>): Observable<ApiResponse<Playlist>> {
    return this.http.post<ApiResponse<Playlist>>(this.apiUrl, data);
  }

  updatePlaylist(
    id: number,
    data: Partial<Playlist>,
  ): Observable<ApiResponse<Playlist>> {
    return this.http.put<ApiResponse<Playlist>>(`${this.apiUrl}/${id}`, data);
  }

  deletePlaylist(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
