import { Routes } from '@angular/router';
import { TeamComponent } from './team/team.component';

export const TEAM_ROUTES: Routes = [
  {
    path: '',
    component: TeamComponent,
    title: 'Meet the Team',
  },
];
