import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import {
  Home,
  MessageSquare,
  List,
  Play
} from 'lucide-angular';
import { MobileAdminMenuComponent } from '../../../shared/components/mobile-admin-menu/mobile-admin-menu.component';

@Component({
  selector: 'app-playlists',
  imports: [HeaderComponent, MobileAdminMenuComponent],
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.scss'
})
export class PlaylistsComponent {
  menuItems = [
    { label: 'Home', icon: Home, route: ['/'] },
    { label: 'Episodes', icon: Play, route: ['/episodes'] },
    { label: 'Playlists', icon: List, route: ['/playlists'] },
    { label: 'Confess', icon: MessageSquare, route: ['/confessions'] },
  ];
}
