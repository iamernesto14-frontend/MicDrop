import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { Home, MessageSquare, List, Play } from 'lucide-angular';
import { MobileAdminMenuComponent } from '../../../shared/components/mobile-admin-menu/mobile-admin-menu.component';
import { ConfessionService } from '../../../core/services/confession.service';
import { ToastService } from '../../../core/services/toast.service';
import { Confession } from '../../../models/confession.model';
import { ToastComponent } from '../../../shared/components/toast/toast.component';

@Component({
  selector: 'app-confession',
  standalone: true,
  imports: [HeaderComponent, MobileAdminMenuComponent, ReactiveFormsModule, CommonModule, ToastComponent],
  templateUrl: './confession.component.html',
  styleUrls: ['./confession.component.scss'],
})
export class ConfessionComponent {
  confessionForm: FormGroup;
  isSubmitting = false;
  showConfirmation = false;

  categories = ['Funny', 'Serious', 'Sad', 'Happy', 'Other'];
  emotions = ['Guilty', 'Happy', 'Sad', 'Angry', 'Neutral'];

  menuItems = [
    { label: 'Home', icon: Home, route: ['/'] },
    { label: 'Episodes', icon: Play, route: ['/episodes'] },
    { label: 'Playlists', icon: List, route: ['/playlists'] },
    { label: 'Confess', icon: MessageSquare, route: ['/confessions'] },
  ];

  constructor(
    private fb: FormBuilder,
    private confessionService: ConfessionService,
    private toastService: ToastService
  ) {
    this.confessionForm = this.fb.group({
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500), this.noWordsValidator]],
      category: ['', Validators.required],
      emotion: ['', Validators.required],
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
      const payload = this.confessionForm.value;

      this.confessionService.submitConfession(payload).subscribe({
        next: (response: { status: string; message: string; data: Confession }) => {
          this.isSubmitting = false;
          this.showConfirmation = true;
          this.confessionForm.reset();
          this.toastService.show(response.message, 'success'); // Use API message

          setTimeout(() => {
            this.showConfirmation = false;
          }, 3000);
        },
        error: (err: any) => {
          this.isSubmitting = false;
          this.toastService.show(
            err.error?.error || 'Failed to submit confession. Please try again.',
            'error'
          );
        },
      });
    }
  }

  get message() {
    return this.confessionForm.get('message');
  }

  get category() {
    return this.confessionForm.get('category');
  }

  get emotion() {
    return this.confessionForm.get('emotion');
  }
}