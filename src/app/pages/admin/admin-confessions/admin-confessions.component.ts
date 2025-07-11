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

  ngOnInit(): void {
    this.loadConfessions();
  }

  loadConfessions(): void {
    
    this.confessionService.getAllConfessions().subscribe({
    next: (response) => {
      console.log('Confessions loaded:', response.data); 
      this.confessions = response.data; 
      this.isLoading = false;
    },
    error: (err) => {
        this.errorMessage = 'Failed to load confessions.';
        console.error(err);
        this.isLoading = false;
      }
    });
  }
}
