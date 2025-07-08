import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Playlist } from '../../models/playlist.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private apiUrl = `${environment.apiUrl}/playlists`;

  constructor(private http: HttpClient) {}

  getPlaylists(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createPlaylist(data: Partial<Playlist>): Observable<Playlist> {
    return this.http.post<Playlist>(this.apiUrl, data);
  }

  updatePlaylist(id: number, data: Partial<Playlist>): Observable<Playlist> {
    return this.http.put<Playlist>(`${this.apiUrl}/${id}`, data);
  }

  deletePlaylist(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
