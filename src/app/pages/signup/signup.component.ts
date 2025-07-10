import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../core/services/toast.service';
import { HomeButtonComponent } from '../../shared/components/home-button.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HomeButtonComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signupForm: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required, this.passwordMatchValidator.bind(this)]],
    });
  }

  currentYear = new Date().getFullYear();

  onSubmit(): void {
    if (this.signupForm.invalid) return;

    const formValue = {
      ...this.signupForm.value,
      role: 'admin',
    };

    this.authService.register(formValue).subscribe({
      next: () => {
        this.toastService.show('Registration successful!', 'success');
        this.router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        const msg = error?.error?.message || 'Registration failed.';
        this.toastService.show(msg, 'error');
      },
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = this.signupForm?.get('password')?.value;
    const confirmPassword = control.value;
    
    if (!password || !confirmPassword) return null;
    
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
