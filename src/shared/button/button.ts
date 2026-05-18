import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  readonly label = input('');
  readonly clicked = output();
}
