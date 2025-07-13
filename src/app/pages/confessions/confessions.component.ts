import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { Home, MessageSquare, List, Users, Play } from 'lucide-angular';
import { MobileAdminMenuComponent } from '../../shared/components/mobile-admin-menu/mobile-admin-menu.component';
import { ConfessionsService } from '../../core/services/confessions.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-confession',
  imports: [HeaderComponent, MobileAdminMenuComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './confessions.component.html',
  styleUrl: './confessions.component.scss',
})
export class ConfessionComponent {
  confessionForm: FormGroup;
  isSubmitting = false;
  showConfirmation = false;

  menuItems = [
    { label: 'Home', icon: Home, route: ['/'] },
    { label: 'Episodes', icon: Play, route: ['/episodes'] },
    { label: 'Playlists', icon: List, route: ['/playlists'] },
    { label: 'Confess', icon: MessageSquare, route: ['/confessions'] },
  ];

  constructor(private fb: FormBuilder, private confessionsService: ConfessionsService, private toastService: ToastService) {
    this.confessionForm = this.fb.group({
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500), this.noWordsValidator]],
      category: ['', Validators.required],
      emotion: ['', Validators.required]
    });
  }

  noWordsValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const words = control.value.trim().split(/\s+/).filter((word: string) => word.length > 0);
    return words.length === 0 ? { noWords: true } : null;
  }

  onSubmit() {
  if (this.confessionForm.valid) {
    this.isSubmitting = true;
    const { message, category, emotion } = this.confessionForm.value;

    this.confessionsService.submitConfession({ message, category, emotion }).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.showConfirmation = true;
        this.confessionForm.reset();

        setTimeout(() => {
          this.showConfirmation = false;
        }, 3000);
      },
      error: (err) => {
        this.isSubmitting = false;
        console.error('Error:', err);
        const msg = err.error?.message || 'Submission failed. Please try again.';
        this.toastService.show(msg, 'error');
      }
    });
  }
}


  get message() {
    return this.confessionForm.get('message');
  }
}
