import { Routes } from '@angular/router';
import { HomePageComponent } from '../home/home-page/home-page.component';

export const HOME_ROUTES: Routes = [
    {
        path: '',
        component: HomePageComponent,
        title: 'Home'
    }
];