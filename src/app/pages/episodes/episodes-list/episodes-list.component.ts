import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { MobileAdminMenuComponent } from '../../../shared/components/mobile-admin-menu/mobile-admin-menu.component';
import {
  Home,
  MessageSquare,
  List,
  Users,
  Play
} from 'lucide-angular';

@Component({
  selector: 'app-episodes-list',
  imports: [HeaderComponent, MobileAdminMenuComponent],
  templateUrl: './episodes-list.component.html',
  styleUrl: './episodes-list.component.scss'
})
export class EpisodesListComponent {
  menuItems = [
    { label: 'Home', icon: Home, route: ['/'] },
    { label: 'Episodes', icon: Play, route: ['/episodes'] },
    { label: 'Playlists', icon: List, route: ['/playlists'] },
    { label: 'Confess', icon: MessageSquare, route: ['/confessions'] },
  ];
}
