import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideAngularModule,
  LayoutDashboard,
  Users,
  MessageSquare,
  List,
  Home,
} from 'lucide-angular';

@Component({
  selector: 'app-mobile-admin-menu',
  standalone: true,
  imports: [LucideAngularModule, RouterLink, CommonModule],
  templateUrl: './mobile-admin-menu.component.html',
  styleUrl: './mobile-admin-menu.component.scss',
})
export class MobileAdminMenuComponent {
  @Input() menuItems: { label: string; icon: any; route: string[] }[] = [];

  readonly LayoutDashboard = LayoutDashboard;
  readonly Users = Users;
  readonly MessageSquare = MessageSquare;
  readonly List = List;
  readonly Home = Home;
}
