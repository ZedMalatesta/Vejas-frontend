import {Component, inject} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {FormBuilder, ReactiveFormsModule, Validators,} from '@angular/forms';
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
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

  async login() {
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

  loginGoogle() {
    this.authService.signInWithGoogle();
  }

  loginGithub() {
    this.authService.signInWithGithub();
  }
}
