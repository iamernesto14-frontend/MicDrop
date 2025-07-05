import { Component } from '@angular/core';
import { MobileAdminMenuComponent } from '../../../shared/components/mobile-admin-menu/mobile-admin-menu.component';
import {
  Home,
  MessageSquare,
  List,
  Play
} from 'lucide-angular';

@Component({
  selector: 'app-episode-detail',
  imports: [MobileAdminMenuComponent],
  templateUrl: './episode-detail.component.html',
  styleUrl: './episode-detail.component.scss'
})
export class EpisodeDetailComponent {
  menuItems = [
    { label: 'Home', icon: Home, route: ['/'] },
    { label: 'Episodes', icon: Play, route: ['/episodes'] },
    { label: 'Playlists', icon: List, route: ['/playlists'] },
    { label: 'Confess', icon: MessageSquare, route: ['/confessions'] },
  ];
}
