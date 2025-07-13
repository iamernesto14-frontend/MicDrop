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

  addTeamMember(
    member: Omit<TeamMember, 'id'>
  ): Observable<{ status: string; data: TeamMember }> {
    return this.http.post<{ status: string; data: TeamMember }>(
      this.baseUrl,
      member
    );
  }

  deleteTeamMember(id: number): Observable<{ status: string; data: null }> {
    return this.http.delete<{ status: string; data: null }>(
      `${this.baseUrl}/${id}`
    );
  }

  updateTeamMember(
    id: number,
    data: Partial<TeamMember>
  ): Observable<{ status: string; data: TeamMember }> {
    return this.http.put<{ status: string; data: TeamMember }>(
      `${this.baseUrl}/${id}`,
      data
    );
  }
}
