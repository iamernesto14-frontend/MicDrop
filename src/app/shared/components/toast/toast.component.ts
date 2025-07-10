// src/app/shared/components/toast/toast.component.ts
import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent implements OnDestroy {
  toast: { message: string; type: string } | null = null;
  private sub: Subscription;

  constructor(private toastService: ToastService) {
    this.sub = this.toastService.toast$.subscribe((toast) => {
      this.toast = toast;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
