import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Confession } from '../../models/confession.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ConfessionService {
  private baseUrl = `${environment.apiUrl}/confessions`;

  constructor(private http: HttpClient) {}

  getAll(status?: 'approved' | 'pending'): Observable<Confession[]> {
  let params = new HttpParams();
  if (status) {
    params = params.set('status', status);
  }

  return this.http
    .get<{ status: string; data: Confession[]; meta: any }>(this.baseUrl, { params })
    .pipe(map((res) => res.data));
}

  updateStatus(id: number, is_approved: boolean): Observable<Confession> {
    return this.http.patch<Confession>(`${this.baseUrl}/${id}`, { is_approved });
  }

  deleteConfession(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
