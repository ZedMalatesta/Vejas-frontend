import { Component, computed, inject, signal } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.html',
  styleUrl: './change-password.scss',
})
export class ChangePassword {
  password = signal('');
  confirmPassword = signal('');
  success = signal(false);
  errorMessage = '';
  passwordError = computed(() => {
    if (!this.password()) {
      return 'Password is required';
    }

    if (this.password().length < 6) {
      return 'Minimum 6 characters';
    }

    return null;
  });
  confirmPasswordError = computed(() => {
    if (!this.confirmPassword()) {
      return 'Please confirm password';
    }

    if (this.password() !== this.confirmPassword()) {
      return 'Passwords do not match';
    }

    return null;
  });
  private authService = inject(AuthService);
  private router = inject(Router);

  async changePassword() {
    if (this.passwordError() || this.confirmPasswordError()) {
      return;
    }

    const { error } = await this.authService.updatePassword(this.password());

    if (error) {
      this.errorMessage = error.message;
      return;
    }

    this.errorMessage = '';

    this.success.set(true);

    setTimeout(() => {
      this.router.navigate(['/auth/login']);
    }, 2000);
  }
}
