import { Component, inject } from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class AuthComponent {
  authService = inject(AuthService);

  email = '';
  password = '';

  login() {
    this.authService.signIn(
      this.email,
      this.password
    );
  }

  register() {
    this.authService.signUp(
      this.email,
      this.password
    );
  }

  loginGoogle() {
    this.authService.signInWithGoogle();
  }

  loginGithub() {
    this.authService.signInWithGithub();
  }
}
