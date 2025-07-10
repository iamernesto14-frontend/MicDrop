import { Component, OnInit } from '@angular/core';
import { Home, MessageSquare, List, Play } from 'lucide-angular';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { MobileAdminMenuComponent } from '../../../shared/components/mobile-admin-menu/mobile-admin-menu.component';
import { RouterOutlet } from '@angular/router';
import { EpisodeService } from '../../../core/services/episode.service';
import { EpisodeCardComponent } from '../../../shared/components/episode-card/episode-card.component';
import { Episode } from '../../../models/episode.model';
import { CommonModule } from '@angular/common';

import { TeamService } from '../../../core/services/team.service';
import { TeamMember } from '../../../models/team-member.model';
import { TeamPreviewComponent } from '../../../shared/components/team-preview/team-preview.component';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeaderComponent,
    MobileAdminMenuComponent,
    RouterOutlet,
    EpisodeCardComponent,
    CommonModule,
    TeamPreviewComponent,
    
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  menuItems = [
    { label: 'Home', icon: Home, route: ['/'] },
    { label: 'Episodes', icon: Play, route: ['/episodes'] },
    { label: 'Playlists', icon: List, route: ['/playlists'] },
    { label: 'Confess', icon: MessageSquare, route: ['/confessions'] },
  ];

  teamMembers: TeamMember[] = [];
  episodes: Episode[] = [];
  currentYear = new Date().getFullYear();
  loading = true;
  error = '';

  constructor(private episodeService: EpisodeService, private teamService: TeamService) {}
  
  ngOnInit(): void {
    this.episodeService.getLatestEpisodes(4).subscribe({
      next: (episodes) => {
        this.episodes = episodes;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load latest episodes';
        this.loading = false;
      },
    });
  
    this.teamService.getTeamMembers().subscribe({
      next: (res) => {
        this.teamMembers = res.data.slice(0, 4); // Show only top 4 if needed
      },
      error: () => {
        console.error('Failed to load team members');
      },
    });
  }
  
}
