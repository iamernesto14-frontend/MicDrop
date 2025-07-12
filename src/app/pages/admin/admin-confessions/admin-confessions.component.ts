import { Component, OnInit } from '@angular/core';
import { Confession } from '../../../models/confession.model';
import { ConfessionService } from '../../../core/services/confession.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Trash2, CircleX, CircleCheckBig } from 'lucide-angular';

@Component({
  selector: 'app-admin-confessions',
  imports: [CommonModule, FormsModule, LucideAngularModule ],
  templateUrl: './admin-confessions.component.html',
  styleUrls: ['./admin-confessions.component.scss'],
  standalone: true,
})
export class AdminConfessionsComponent implements OnInit {
  confessions: Confession[] = [];
  filter = '';
  selectedStatus: 'all' | 'approved' | 'pending' = 'all';
  selected: number[] = [];
  readonly Trash2 = Trash2;
  readonly CircleX = CircleX;
  readonly CircleCheckBig = CircleCheckBig;

  constructor(private confessionService: ConfessionService) {}

  ngOnInit() {
    this.fetchConfessions();
  }

  fetchConfessions(): void {
  const status = this.selectedStatus === 'all' ? undefined : this.selectedStatus;
  this.confessionService.getAll(status).subscribe((data) => {
    console.log('📦 API Response:', data); // 🔍 Log the response here
    this.confessions = Array.isArray(data) ? data : [];
    this.selected = [];
  });
}


  approveSelected(): void {
    this.selected.forEach(id => this.setStatus(id, true));
  }

  rejectSelected(): void {
    this.selected.forEach(id => this.setStatus(id, false));
  }

  deleteSelected(): void {
    this.selected.forEach(id => this.deleteConfession(id));
  }

  setStatus(id: number, is_approved: boolean): void {
    this.confessionService.updateStatus(id, is_approved).subscribe(updated => {
      this.confessions = this.confessions.map(c =>
        c.id === updated.id ? updated : c
      );
    });
  }

  deleteConfession(id: number): void {
  this.confessionService.deleteConfession(id).subscribe(() => {
    this.confessions = this.confessions.filter(c => c.id !== id);
    this.selected = this.selected.filter(sid => sid !== id);
  });
}


  toggleAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.selected = checked ? this.confessions.map(c => c.id) : [];
  }

  toggleSelection(id: number): void {
    this.selected.includes(id)
      ? this.selected = this.selected.filter(s => s !== id)
      : this.selected.push(id);
  }

  get filteredConfessions(): Confession[] {
    return this.confessions.filter(c =>
      c.message.toLowerCase().includes(this.filter.toLowerCase())
    );
  }

  getStatusLabel(c: Confession): string {
    return c.is_approved === null ? 'pending' : c.is_approved ? 'approved' : 'rejected';
  }
}
