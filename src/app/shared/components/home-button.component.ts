import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="home-btn" (click)="goToHome()" title="Go to Homepage">
      ← Home
    </button>
  `,
  styles: `
    .home-btn {
      position: fixed;
      top: 2rem;
      left: 2rem;
      background: var(--card);
      border: 1px solid var(--border);
      color: var(--foreground);
      padding: 0.75rem 1.5rem;
      border-radius: var(--radius-lg);
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: var(--shadow);
      z-index: 100;
      
      &:hover {
        background: var(--gradient-primary);
        color: var(--primary-foreground);
        transform: translateY(-1px);
        box-shadow: var(--shadow-md);
        border-color: transparent;
      }
      
      @media (max-width: 768px) {
        top: 1rem;
        left: 1rem;
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
      }
    }
  `
})
export class HomeButtonComponent {
  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['/']);
  }
}