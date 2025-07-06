import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { canActivateAdmin, canMatchAdmin } from './core/guards/auth.guard';


export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.routes').then((m) => m.HOME_ROUTES),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/signup/signup.component').then((m) => m.SignupComponent),
    },
    {
        path: 'logout',
        loadComponent: () =>
          import('./shared/components/logout/logout.component').then((m) => m.LogoutComponent),
      }
,      
  {
    path: 'confessions',
    loadChildren: () =>
      import('./pages/confessions/confessions.routes').then((m) => m.CONFESSIONS_ROUTES),
  },
  {
    path: 'episodes',
    loadChildren: () =>
      import('./pages/episodes/episodes.routes').then((m) => m.EPISODES_ROUTES),
  },
  {
    path: 'playlists',
    loadChildren: () =>
      import('./pages/playlists/playlists.routes').then((m) => m.PLAYLISTS_ROUTES),
  },
  {
    path: 'team',
    loadChildren: () =>
      import('./pages/team/team.routes').then((m) => m.TEAM_ROUTES),
  },
  {
    path: 'admin',
    canActivate: [canActivateAdmin], // Guards access to child routes
    canMatch: [canMatchAdmin],       // Prevents lazy loading when not authenticated
    loadChildren: () =>
      import('./pages/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

export const APP_ROUTER = provideRouter(routes);
