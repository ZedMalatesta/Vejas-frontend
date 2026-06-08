import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {
  email = signal('');
  success = signal(false);
  errorMessage = '';
  private authService = inject(AuthService);

  async resetPassword() {
    const { error } = await this.authService.resetPassword(this.email());

    if (error) {
      this.errorMessage = error.message;
      return;
    }

    this.errorMessage = '';

    this.success.set(true);
  }
}
