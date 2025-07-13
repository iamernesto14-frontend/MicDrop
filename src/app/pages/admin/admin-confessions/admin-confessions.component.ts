import { Component, OnInit } from '@angular/core';
import { Confession } from '../../../models/confession.model';
import { ConfessionService } from '../../../core/services/confession.service';
import { ToastService } from '../../../core/services/toast.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Trash2, CircleX, CircleCheckBig } from 'lucide-angular';
import { ToastComponent } from '../../../shared/components/toast/toast.component';

@Component({
  selector: 'app-admin-confessions',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, ToastComponent],
  templateUrl: './admin-confessions.component.html',
  styleUrls: ['./admin-confessions.component.scss'],
})
export class AdminConfessionsComponent implements OnInit {
  confessions: Confession[] = [];
  filter = '';
  selected: number[] = [];
  readonly Trash2 = Trash2;
  readonly CircleX = CircleX;
  readonly CircleCheckBig = CircleCheckBig;

  constructor(
    private confessionService: ConfessionService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.fetchConfessions();
  }

  fetchConfessions(): void {
    this.confessionService.getAll().subscribe({
      next: (data) => {
        this.confessions = (data || []).map(c => ({
          ...c,
          is_approved: c.is_approved ?? null, // Default to null if undefined
        }));
        this.selected = [];
      },
      error: () => {
        this.toastService.show('Failed to fetch confessions.', 'error');
      },
    });
  }

  setStatus(id: number, is_approved: boolean): void {
    this.confessionService.updateStatus(id, is_approved).subscribe({
      next: (updated) => {
        this.confessions = this.confessions.map(c =>
          c.id === updated.id ? updated : c
        );
        this.toastService.show(
          `Confession ${is_approved ? 'approved' : 'rejected'} successfully!`,
          'success'
        );
      },
      error: () => {
        this.toastService.show(
          `Failed to ${is_approved ? 'approve' : 'reject'} confession.`,
          'error'
        );
      },
    });
  }

  deleteConfession(id: number): void {
    this.confessionService.deleteConfession(id).subscribe({
      next: () => {
        this.confessions = this.confessions.filter(c => c.id !== id);
        this.selected = this.selected.filter(sid => sid !== id);
        this.toastService.show('Confession deleted successfully!', 'success');
      },
      error: () => {
        this.toastService.show('Failed to delete confession.', 'error');
      },
    });
  }

  toggleAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.selected = checked ? this.confessions.map(c => c.id) : [];
  }

  toggleSelection(id: number): void {
    this.selected.includes(id)
      ? (this.selected = this.selected.filter(s => s !== id))
      : this.selected.push(id);
  }

  get filteredConfessions(): Confession[] {
    return this.confessions.filter(c =>
      c.message.toLowerCase().includes(this.filter.toLowerCase())
    );
  }

  getStatusLabel(c: Confession): string {
    return c.is_approved === null || c.is_approved === undefined ? 'pending' : c.is_approved ? 'approved' : 'rejected';
  }
}