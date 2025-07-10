import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    if (typeof email !== 'string' || typeof password !== 'string') {
      this.toastService.show('Please enter valid credentials.', 'error');
      return;
    }
    this.authService.login({ email, password }).subscribe({
      next: () => {
        this.toastService.show('Login successful!', 'success');
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        const msg = err?.error?.message || 'Invalid credentials.';
        this.toastService.show(msg, 'error');
      },
    });
  }

  currentYear = new Date().getFullYear();
}
