import { Routes } from '@angular/router';
import { EpisodesListComponent } from '../episodes/episodes-list/episodes-list.component';
import { EpisodeDetailComponent } from '../episodes/episode-detail/episode-detail.component';

export const EPISODES_ROUTES: Routes = [
  {
    path: '',
    component: EpisodesListComponent,
    title: 'All Episodes',
  },
  {
    path: ':id',
    component: EpisodeDetailComponent,
    title: 'Episode Details',
  },
];
