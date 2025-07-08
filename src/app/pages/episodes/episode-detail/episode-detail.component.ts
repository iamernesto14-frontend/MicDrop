import { Component, OnInit } from '@angular/core';
import { MobileAdminMenuComponent } from '../../../shared/components/mobile-admin-menu/mobile-admin-menu.component';
import {
  Home,
  MessageSquare,
  List,
  Play
} from 'lucide-angular';
import { Episode } from '../../../models/episode.model';
import { ActivatedRoute } from '@angular/router';
import { EpisodeService } from '../../../core/services/episode.service';
import { of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../../shared/components/header/header.component";

@Component({
  selector: 'app-episode-detail',
  imports: [MobileAdminMenuComponent, CommonModule, HeaderComponent],
  templateUrl: './episode-detail.component.html',
  styleUrl: './episode-detail.component.scss'
})
export class EpisodeDetailComponent implements OnInit {
  episode!: Episode;
  loading = true;
  error: string | null = null;

  menuItems = [
    { label: 'Home', icon: Home, route: ['/'] },
    { label: 'Episodes', icon: Play, route: ['/episodes'] },
    { label: 'Playlists', icon: List, route: ['/playlists'] },
    { label: 'Confess', icon: MessageSquare, route: ['/confessions'] },
  ];

  constructor(
    private route: ActivatedRoute,
    private episodeService: EpisodeService
  ) { }
  
  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          const id = Number(params.get('id'));
          if (!id) {
            this.error = 'Invalid episode ID.';
            return of(null);
          }
          return this.episodeService.getEpisodeByIdFromList(id);
        })
      )
      .subscribe({
        next: (episode) => {
          if (episode) {
            this.episode = episode;
          } else {
            this.error = 'Episode not found.';
          }
          this.loading = false;
        },
        error: () => {
          this.error = 'An unexpected error occurred.';
          this.loading = false;
        },
      });
  }
  }
