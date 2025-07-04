import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminToolbarComponent } from '../admin-toolbar/admin-toolbar.component';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { MobileAdminMenuComponent } from '../../../shared/components/mobile-admin-menu/mobile-admin-menu.component';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, AdminToolbarComponent, SidebarComponent, MobileAdminMenuComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {

}
