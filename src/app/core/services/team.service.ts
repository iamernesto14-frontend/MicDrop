import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { TeamMember } from '../../models/team-member.model';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private baseUrl = `${environment.apiUrl}/team-members`;

  constructor(private http: HttpClient) {}

  getTeamMembers(): Observable<{ status: string; data: TeamMember[] }> {
    return this.http.get<{ status: string; data: TeamMember[] }>(this.baseUrl);
  }

  addTeamMember(member: TeamMember): Observable<TeamMember> {
    return this.http.post<TeamMember>(this.baseUrl, member);
  }

  deleteTeamMember(id: number): Observable<TeamMember> {
    return this.http.delete<TeamMember>(`${this.baseUrl}/${id}`);
  }

  updateTeamMember(id: number, data: TeamMember): Observable<TeamMember> {
    return this.http.put<TeamMember>(`${this.baseUrl}/${id}`, data);
  }
}
