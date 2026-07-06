import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: '../shared/auth.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  authService = inject(AuthService);
  readonly errorMessage = signal('');
  readonly successMessage = signal('');
  private fb = inject(FormBuilder);
  form = this.fb.group({
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
      ],
    ],

    email: ['', [Validators.required, Validators.email]],

    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  private router = inject(Router);

  async register(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const email = this.form.value.email!;
    const password = this.form.value.password!;

    const {error} = await this.authService.signUp(email, password);

    if (error) {
      this.errorMessage.set(error.message);
      return;
    }

    this.successMessage.set('Account created! Check your email to confirm before signing in.');
  }
}
