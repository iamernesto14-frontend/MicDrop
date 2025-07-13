// admin-playlist-form.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PlaylistService } from '../../../core/services/playlist.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Playlist } from '../../../models/playlist.model';
import { EpisodeService } from '../../../core/services/episode.service';
import { Episode } from '../../../models/episode.model';

@Component({
  selector: 'app-admin-playlist-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './admin-playlist-form.component.html',
  styleUrls: ['./admin-playlist-form.component.scss'],
})
export class AdminPlaylistFormComponent {
  @Input() playlist: Playlist | null = null;
  @Output() submitted = new EventEmitter<void>();

  playlistForm: FormGroup;
  episodes: Episode[] = [];

  constructor(
    private fb: FormBuilder,
    private playlistService: PlaylistService,
    private episodeService: EpisodeService,
  ) {
    this.playlistForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      episodes: [[]],
    });
  }

  ngOnInit(): void {
    this.fetchEpisodes();
    if (this.playlist) {
      this.playlistForm.patchValue(this.playlist);
    }
  }

  fetchEpisodes(): void {
    this.episodeService.getEpisodes().subscribe({
      next: (res) => {
        this.episodes = res.data || [];
      },
      error: (err) => {
        console.error('Failed to fetch episodes:', err);
      },
    });
  }

  onSubmit(): void {
    if (this.playlistForm.invalid) return;

    const action = this.playlist
      ? this.playlistService.updatePlaylist(
          this.playlist.id,
          this.playlistForm.value,
        )
      : this.playlistService.createPlaylist(this.playlistForm.value);

    action.subscribe({
      next: () => this.submitted.emit(),
      error: (err) => console.error('Failed to save playlist:', err),
    });
  }
}
