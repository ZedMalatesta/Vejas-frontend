import { Component, EventEmitter, Output, signal } from '@angular/core';
import { TextInput } from '../text-input/text-input';
import { Button } from '../button/button';

@Component({
  selector: 'app-link-input',
  imports: [TextInput, Button],
  templateUrl: './link-input.html',
  styleUrl: './link-input.scss',
})
export class LinkInput {
  @Output() submit = new EventEmitter<string>();

  readonly currentValue = signal('');
}
