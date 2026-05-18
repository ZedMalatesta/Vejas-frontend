import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.html',
  styleUrl: './text-input.scss',
})
export class TextInput {
  @Input() placeholder = '';
  @Output() valueChange = new EventEmitter<string>();
  @Output() submit = new EventEmitter<string>();

  readonly value = signal('');

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
