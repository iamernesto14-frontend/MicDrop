import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { Home, MessageSquare, List, Users, Play } from 'lucide-angular';
import { MobileAdminMenuComponent } from '../../../shared/components/mobile-admin-menu/mobile-admin-menu.component';

@Component({
  selector: 'app-confession',
  imports: [HeaderComponent, MobileAdminMenuComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './confession.component.html',
  styleUrl: './confession.component.scss',
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

  constructor(private fb: FormBuilder) {
    this.confessionForm = this.fb.group({
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500), this.noWordsValidator]]
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
      
      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
        this.showConfirmation = true;
        this.confessionForm.reset();
        
        // Hide confirmation after 3 seconds
        setTimeout(() => {
          this.showConfirmation = false;
        }, 3000);
      }, 1000);
    }
  }

  get message() {
    return this.confessionForm.get('message');
  }
}
