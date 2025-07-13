import { Component, OnInit, inject } from '@angular/core';
import { ConfessionsService } from '../../../core/services/confessions.service';
import { Confession } from '../../../models/confession.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-confessions',
  imports: [CommonModule],
  templateUrl: './admin-confessions.component.html',
  styleUrl: './admin-confessions.component.scss',
})
export class AdminConfessionsComponent implements OnInit {
  private confessionService = inject(ConfessionsService);

  confessions: Confession[] = [];
  isLoading = true;
  errorMessage = '';
  currentPage = 1;
  totalPages = 1;
  totalItems = 0;

  ngOnInit(): void {
    this.loadConfessions();
  }

  loadConfessions(): void {
    this.isLoading = true;
    this.confessionService.getAllConfessions(this.currentPage).subscribe({
      next: (response) => {
        this.confessions = response.data;
        this.totalPages = response.meta.last_page;
        this.totalItems = response.meta.total;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load confessions.';
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadConfessions();
    }
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  prevPage(): void {
    this.goToPage(this.currentPage - 1);
  }
}
