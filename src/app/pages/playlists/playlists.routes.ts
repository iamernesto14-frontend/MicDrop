import { Routes } from '@angular/router';
import { PlaylistsComponent } from './playlists/playlists.component';

export const PLAYLISTS_ROUTES: Routes = [
  {
    path: '',
    component: PlaylistsComponent,
    title: 'Playlists',
  },
];
