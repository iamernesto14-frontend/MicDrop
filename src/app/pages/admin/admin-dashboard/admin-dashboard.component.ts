import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  userName: string = '';

  constructor(private authService: AuthService) {
    const user = this.authService.getUser();
    this.userName = user?.name || 'Admin';
  }
}
