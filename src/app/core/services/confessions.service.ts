import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ConfessionResponse } from '../../models/confession-response.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfessionsService {
  constructor(private http: HttpClient) {}

  submitConfession(message: string): Observable<any> {
    const body = { message };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${environment.apiUrl}/confessions`, body, { headers });
  }

  getAllConfessions(): Observable<ConfessionResponse> {
    return this.http.get<ConfessionResponse>(`${environment.apiUrl}/confessions`).pipe(
    );
  }
}
