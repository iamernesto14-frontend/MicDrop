import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { RouterLink } from '@angular/router';
import { TeamService } from '../../../core/services/team.service';
import { EpisodeService } from '../../../core/services/episode.service';
import { TeamMember } from '../../../models/team-member.model';
import { Episode } from '../../../models/episode.model';
import { Confession } from '../../../models/confession.model';
import { Playlist } from '../../../models/playlist.model';
import { PlaylistService } from '../../../core/services/playlist.service';
import { ConfessionsService } from '../../../core/services/confessions.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit {
  userName: string = '';
  teamMembers: TeamMember[] = [];
  episodes: Episode[] = [];
  confession: Confession[] = [];
  playlists: Playlist[] = [];

  constructor(
    private authService: AuthService,
    private teamService: TeamService,
    private episodeService: EpisodeService,
    private confessionService: ConfessionsService,
    private playlistService: PlaylistService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    this.userName = user?.name || 'Admin';

    this.loadTeamMembers();
    this.loadEpisodes();
    this.loadConfessions();
    this.loadPlaylists();
  }

  private loadTeamMembers(): void {
    this.teamService.getTeamMembers().subscribe({
      next: (res) => {
        this.teamMembers = res.data;
      },
      error: (err) => {
        console.error('Failed to load team members', err);
      },
    });
  }

  private loadEpisodes(): void {
    this.episodeService.getEpisodes().subscribe({
      next: (res) => {
        this.episodes = res.data;
      },
      error: (err) => {
        console.error('Failed to load episodes', err);
      },
    });  
  }

  private loadConfessions(): void {
    this.confessionService.getAllConfessions(1).subscribe({
      next: (res) => {
        this.confession = res.data;
      },
      error: (err) => {
        console.error('Failed to load confessions', err);
      },
    });  
  }

  private loadPlaylists(): void {
    this.playlistService.getPlaylists().subscribe({
      next: (res) => {
        this.playlists = res.data?.data || [];
      },
      error: (err) => {
        console.error('Failed to load playlists', err);
      },
    });
  }

  get teamCount(): number {
    return this.teamMembers.length;
  }

  get episodeCount(): number {
    return this.episodes.length;
  }

  get confessionCount(): number {
    return this.confession.length;
  }

  get playlistCount(): number {
    return this.playlists.length;
  }
}
