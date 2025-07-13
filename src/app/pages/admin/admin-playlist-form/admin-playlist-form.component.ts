import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlaylistService } from '../../../core/services/playlist.service';
import { Playlist } from '../../../models/playlist.model';
import { EpisodeService } from '../../../core/services/episode.service';
import { ToastService } from '../../../core/services/toast.service'; // ✅ ADD THIS
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-playlist-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './admin-playlist-form.component.html',
  styleUrls: ['./admin-playlist-form.component.scss'],
})
export class AdminPlaylistFormComponent implements OnInit {
  @Input() playlist?: Playlist;
  @Output() submitted = new EventEmitter<void>();

  form!: FormGroup;
  episodes: any[] = [];

  constructor(
    private fb: FormBuilder,
    private playlistService: PlaylistService,
    private episodeService: EpisodeService,
    private toastService: ToastService // ✅ Inject toast service
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.playlist?.name || '', Validators.required],
      description: [this.playlist?.description || '', Validators.required],
      episodes: [this.playlist?.episodes || []], // for display only
    });

    this.loadEpisodes();
  }

  loadEpisodes(): void {
    this.episodeService.getEpisodes().subscribe({
      next: (res) => {
        this.episodes = res.data || res;
      },
      error: (err) => console.error('Failed to load episodes', err),
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const payload = {
      name: this.form.value.name,
      description: this.form.value.description,
    };

    if (this.playlist) {
      this.playlistService.updatePlaylist(this.playlist.id, payload).subscribe({
        next: () => {
          this.toastService.show('Playlist updated successfully!', 'success');
          this.submitted.emit();
        },
        error: (err) => {
          console.error('Update Error:', err);
          this.toastService.show(
            err.error?.message || 'Failed to update playlist.',
            'error'
          );
        },
      });
    } else {
      this.playlistService.createPlaylist(payload).subscribe({
        next: () => {
          this.toastService.show('Playlist created successfully!', 'success');
          this.submitted.emit();
        },
        error: (err) => {
          console.error('Create Error:', err);
          this.toastService.show(
            err.error?.message || 'Failed to create playlist.',
            'error'
          );
        },
      });
    }
  }
}
