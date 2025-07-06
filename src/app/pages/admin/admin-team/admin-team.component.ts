import { Component, OnInit } from '@angular/core';
import { TeamMember } from '../../../models/team-member.model';
import { TeamService } from '../../../core/services/team.service';

@Component({
  selector: 'app-admin-team',
  imports: [],
  templateUrl: './admin-team.component.html',
  styleUrl: './admin-team.component.scss'
})
export class AdminTeamComponent implements OnInit {
  teamMembers: TeamMember[] = [];

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.teamService.getTeamMembers().subscribe({
      next: (data) => {
        console.log('Team members fetched:', data);
        this.teamMembers = data;
      },
      error: (err) => {
        console.error('Failed to fetch team members:', err);
      }
    });
  }
  
}
