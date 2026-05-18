import { Component, output, signal } from '@angular/core';
import { TextInput } from '../text-input/text-input';
import { Button } from '../button/button';

@Component({
  selector: 'app-link-input',
  imports: [TextInput, Button],
  templateUrl: './link-input.html',
  styleUrl: './link-input.scss',
})
export class LinkInput {
  readonly submit = output<string>();
  readonly currentValue = signal('');
}
