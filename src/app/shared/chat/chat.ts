import { DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ChatService } from '../../screens/room/chat.service';

@Component({
  selector: 'app-chat',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './chat.html',
  styleUrl: './chat.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Chat implements AfterViewInit {
  private readonly chatService = inject(ChatService);
  private readonly authService = inject(AuthService);

  @ViewChild('messageList') private messageList!: ElementRef<HTMLElement>;

  readonly messages = this.chatService.messages;

  readonly author = computed(() => {
    const user = this.authService.user();
    return user?.user_metadata?.['full_name'] ?? user?.email ?? 'Guest';
  });

  readonly messageControl = new FormControl('', [Validators.required]);

  constructor() {
    effect(() => {
      this.messages();
      this.scrollToBottom();
    });
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  onSubmit(): void {
    if (this.messageControl.invalid) return;
    this.chatService.send(this.messageControl.value!, this.author());
    this.messageControl.reset();
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.messageList) {
        this.messageList.nativeElement.scrollTop = this.messageList.nativeElement.scrollHeight;
      }
    });
  }
}
