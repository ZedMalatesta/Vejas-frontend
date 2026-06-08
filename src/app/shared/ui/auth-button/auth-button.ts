import {Component, input, output} from '@angular/core';

@Component({
  selector: 'app-auth-button',
  imports: [],
  templateUrl: './auth-button.html',
  styleUrl: './auth-button.scss',
})
export class AuthButton {
  readonly text = input.required<string>();

  readonly clicked = output<void>();

  onClick(): void {
    this.clicked.emit();
  }
}
