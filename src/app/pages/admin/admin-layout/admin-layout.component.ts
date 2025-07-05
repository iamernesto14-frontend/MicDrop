import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminToolbarComponent } from '../admin-toolbar/admin-toolbar.component';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { MobileAdminMenuComponent } from '../../../shared/components/mobile-admin-menu/mobile-admin-menu.component';
import { CommonModule } from '@angular/common';
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  List,
} from 'lucide-angular';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, AdminToolbarComponent, SidebarComponent, MobileAdminMenuComponent, CommonModule,],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
  isScrollingDown = false;
  private lastScrollTop = 0;

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    this.isScrollingDown = scrollTop > this.lastScrollTop;
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, route: ['/admin'] },
    { label: 'Confessions', icon: MessageSquare, route: ['/admin', 'confessions'] },
    { label: 'Playlists', icon: List, route: ['/admin', 'playlists'] },
    { label: 'Team', icon: Users, route: ['/admin', 'team'] },
  ];

}
