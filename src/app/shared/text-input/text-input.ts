import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.html',
  styleUrl: './text-input.scss',
})
export class TextInput {
  readonly placeholder = input('');
  readonly resetKey = input(0);
  readonly valueChange = output<string>();
  readonly submit = output<string>();

  readonly value = signal('');

  constructor() {
    effect(() => {
      this.resetKey();
      this.value.set('');
    });
  }

  onInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.value.set(val);
    this.valueChange.emit(val);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.submit.emit(this.value());
    }
  }
}
