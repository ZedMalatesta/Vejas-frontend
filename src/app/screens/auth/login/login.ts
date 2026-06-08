import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {FormBuilder, ReactiveFormsModule, Validators,} from '@angular/forms';
import {RouterLink} from "@angular/router";
import {AuthButton} from '../../../shared/ui/auth-button/auth-button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, AuthButton],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit, OnDestroy {
  authService = inject(AuthService);
  private fb = inject(FormBuilder);

  form = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email,
      ],
    ],

    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
      ],
    ],
  });

  async login(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const email = this.form.value.email!;
    const password = this.form.value.password!;

    await this.authService.signIn(
      email,
      password
    );
  }

  loginGoogle(): void {
    this.authService.signInWithGoogle();
  }

  loginGithub(): void {
    this.authService.signInWithGithub();
  }

  ngOnInit(): void {
    console.log('Login init');
  }

  ngOnDestroy(): void {
    console.log('Login destroy');
  }
}
