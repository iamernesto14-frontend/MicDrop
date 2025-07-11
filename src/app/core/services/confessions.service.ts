import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfessionsService {
  private apiUrl = `${environment.apiUrl}/confessions`;

  constructor(private http: HttpClient) {}

  submitConfession(message: string): Observable<any> {
    const body = { message };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.apiUrl, body, { headers });
  }
}
