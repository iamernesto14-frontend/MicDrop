import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { Home, MessageSquare, List, Users, Play } from 'lucide-angular';
import { MobileAdminMenuComponent } from '../../../shared/components/mobile-admin-menu/mobile-admin-menu.component';

@Component({
  selector: 'app-confession',
  imports: [HeaderComponent, MobileAdminMenuComponent],
  templateUrl: './confession.component.html',
  styleUrl: './confession.component.scss',
})
export class ConfessionComponent {
  menuItems = [
    { label: 'Home', icon: Home, route: ['/'] },
    { label: 'Episodes', icon: Play, route: ['/episodes'] },
    { label: 'Playlists', icon: List, route: ['/playlists'] },
    { label: 'Confess', icon: MessageSquare, route: ['/confessions'] },
  ];
}
