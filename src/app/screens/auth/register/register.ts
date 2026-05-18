import {Component, inject} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {FormBuilder, ReactiveFormsModule, Validators,} from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
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

  async register() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const email = this.form.value.email!;
    const password = this.form.value.password!;

    await this.authService.signUp(
      email,
      password
    );
  }
}
