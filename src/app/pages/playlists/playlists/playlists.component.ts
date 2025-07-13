import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { MobileAdminMenuComponent } from '../../../shared/components/mobile-admin-menu/mobile-admin-menu.component';
import { PlaylistService } from '../../../core/services/playlist.service';
import { Playlist } from '../../../models/playlist.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-playlists',
  standalone: true,
  imports: [
    HeaderComponent,
    MobileAdminMenuComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.scss',
})
export class PlaylistsComponent implements OnInit {
  playlists: Playlist[] = [];
  filteredPlaylists: Playlist[] = [];
  loading = true;
  error = '';
  searchTerm = '';

  menuItems = [
    { label: 'Home', icon: 'home', route: ['/'] },
    { label: 'Episodes', icon: 'play', route: ['/episodes'] },
    { label: 'Playlists', icon: 'list', route: ['/playlists'] },
    { label: 'Confess', icon: 'message-square', route: ['/confessions'] },
  ];

  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {
    this.playlistService.getPlaylists().subscribe({
      next: (res) => {
        this.playlists = res.data?.data || res.data || [];
        this.filteredPlaylists = [...this.playlists];
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load playlists.';
        this.loading = false;
      },
    });
  }

  filterPlaylists(): void {
    if (!this.searchTerm.trim()) {
      this.filteredPlaylists = [...this.playlists];
      return;
    }
    
    const term = this.searchTerm.toLowerCase();
    this.filteredPlaylists = this.playlists.filter(playlist => 
      playlist.name.toLowerCase().includes(term) || 
      playlist.description.toLowerCase().includes(term)
    );
  }

  trackByPlaylist(index: number, playlist: Playlist): number {
    return playlist.id;
  }
}
