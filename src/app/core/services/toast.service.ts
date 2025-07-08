import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast } from '../../models/toast.model';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastSubject = new BehaviorSubject<Toast | null>(null);
  toast$ = this.toastSubject.asObservable();

  show(message: string, type: Toast['type'] = 'info') {
    this.toastSubject.next({ message, type });

    // Auto-dismiss after 3 seconds
    setTimeout(() => this.toastSubject.next(null), 3000);
  }
}
