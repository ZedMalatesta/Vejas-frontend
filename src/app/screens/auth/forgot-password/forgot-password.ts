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
  readonly email = signal('');
  readonly success = signal(false);
  errorMessage = '';
  private authService = inject(AuthService);

  async resetPassword(): Promise<void> {
    const { error } = await this.authService.resetPassword(this.email());

    if (error) {
      this.errorMessage = error.message;
      return;
    }

    this.errorMessage = '';

    this.success.set(true);
  }
}
