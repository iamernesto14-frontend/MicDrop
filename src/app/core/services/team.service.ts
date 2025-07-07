import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { TeamMember } from '../../models/team-member.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private baseUrl = `${environment.apiUrl}/team-members`;

  constructor(private http: HttpClient) {}

  getTeamMembers(): Observable<{ status: string; data: TeamMember[] }> {
    return this.http.get<{ status: string; data: TeamMember[] }>(this.baseUrl);
  }

  addTeamMember(member: any): Observable<any> {
    return this.http.post(this.baseUrl, member);
  }

  deleteTeamMember(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updateTeamMember(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }
  
}
