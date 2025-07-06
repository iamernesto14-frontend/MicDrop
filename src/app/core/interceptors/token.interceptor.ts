import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  const authReq = token
    ? req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      })
    : req;

  return next(authReq).pipe(
    catchError((error) => {
      // Handle 401 errors globally
      if (error.status === 401) {
        console.warn('Unauthorized - logging out');
        authService.logout();
        // Optional: Redirect to login
      }

      // Log other errors or show toast here
      console.error('HTTP Error:', error);

      return throwError(() => error);
    })
  );
};
