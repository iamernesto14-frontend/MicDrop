// admin-playlists.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistService } from '../../../core/services/playlist.service';
import { Playlist } from '../../../models/playlist.model';
import { AdminPlaylistFormComponent } from '../admin-playlist-form/admin-playlist-form.component';
import { LucideAngularModule, SquarePen, Trash2, PlusCircle } from 'lucide-angular';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-admin-playlists',
  standalone: true,
  imports: [
    CommonModule,
    AdminPlaylistFormComponent,
    LucideAngularModule,
    ConfirmModalComponent
  ],
  templateUrl: './admin-playlists.component.html',
  styleUrl: './admin-playlists.component.scss'
})
export class AdminPlaylistsComponent {
  playlists: Playlist[] = [];
  showForm = false;
  editingPlaylist?: Playlist;
  showConfirmModal = false;
  playlistToDelete?: Playlist;
  readonly SquarePen = SquarePen;
  readonly Trash2 = Trash2;
  readonly PlusCircle = PlusCircle;

  constructor(private playlistService: PlaylistService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.loadPlaylists();
  }

  loadPlaylists(): void {
    this.playlistService.getPlaylists().subscribe({
      next: (res) => {
        this.playlists = res.data?.data || [];
      },
      error: (err) => {
        console.error('Error loading playlists:', err);
      }
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    this.editingPlaylist = undefined;
  }

  onFormSubmitted(): void {
    this.toggleForm();
    this.loadPlaylists();
  }

  editPlaylist(playlist: Playlist): void {
    this.editingPlaylist = playlist;
    this.showForm = true;
  }

  confirmDelete(playlist: Playlist): void {
    this.playlistToDelete = playlist;
    this.showConfirmModal = true;
  }

  deletePlaylist(): void {
    if (!this.playlistToDelete) return;

    this.playlistService.deletePlaylist(this.playlistToDelete.id).subscribe({
      next: () => {
        this.toastService.show('Playlist deleted successfully.', 'success');
        this.playlists = this.playlists.filter(p => p.id !== this.playlistToDelete?.id);
        this.showConfirmModal = false;
        this.playlistToDelete = undefined;
      },
      error: () => {
        this.toastService.show('Failed to delete playlist.', 'error');
        this.showConfirmModal = false;
      }
    });
  }

  hideConfirmModal() {
    this.showConfirmModal = false;
  }
}