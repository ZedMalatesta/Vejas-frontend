import {Component, input, output} from '@angular/core';

@Component({
  selector: 'app-auth-button',
  imports: [],
  templateUrl: './auth-button.html',
  styleUrl: './auth-button.scss',
})
export class AuthButton {
  text = input.required<string>();

  clicked = output<void>();

  onClick() {
    this.clicked.emit();
  }
}
