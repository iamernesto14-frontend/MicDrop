import { Component, Input, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTheme } from '../../../store/theme/theme.selectors';
import { toggleTheme } from '../../../store/theme/theme.actions';
import { LucideAngularModule, Moon, Sun } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
})
export class ThemeToggleComponent {
  @Input() showLabel = false;

  readonly Moon = Moon;
  readonly Sun = Sun;
  private store = inject(Store);
  theme$ = this.store.select(selectTheme);

  toggleTheme() {
    this.store.dispatch(toggleTheme());
  }
}
