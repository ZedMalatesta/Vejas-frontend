import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.html',
  styleUrl: './text-input.scss',
})
export class TextInput {
  readonly placeholder = input('');
  readonly submit = output<string>();

  readonly value = signal('');

  onInput(event: Event): void {
    this.value.set((event.target as HTMLInputElement).value);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.submit.emit(this.value());
    }
  }
}
