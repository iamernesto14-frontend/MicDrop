import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  LayoutDashboard,
  List,
  MessageSquare,
  Users,
  LogOut,
  Headphones
} from 'lucide-angular';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    LucideAngularModule,
    ThemeToggleComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  readonly LayoutDashboard = LayoutDashboard;
  readonly List = List;
  readonly MessageSquare = MessageSquare;
  readonly Users = Users;
  readonly LogOut = LogOut;
  readonly Headphones = Headphones;

  admin = {
    name: 'Ernest Anokye',
    email: 'eernesto211@gmail.com',
    avatar: 'https://ui-avatars.com/api/?name=Ernest+Anokye'
  };

}
