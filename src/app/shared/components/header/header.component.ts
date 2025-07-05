import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Headphones, Moon, Sun } from 'lucide-angular';

@Component({
  selector: 'app-header',
  imports: [
    LucideAngularModule, RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  readonly Headphones = Headphones;
  readonly Moon = Moon;
  readonly Sun = Sun;
}
