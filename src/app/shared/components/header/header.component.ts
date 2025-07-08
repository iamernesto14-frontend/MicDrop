import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Headphones } from 'lucide-angular';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule, RouterLink, ThemeToggleComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly Headphones = Headphones;
}
