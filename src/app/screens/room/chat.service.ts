import { inject, Injectable, signal } from '@angular/core';
import { ChatMessage } from '../../shared/chat/chat-message.model';
import { SocketService } from '../../core/services/socket.service';
import { RoomApiService } from '../../core/services/room-api.service';

const ROOM_ID = 'demo-room';

interface ChatMessagePayload {
  id: string;
  author: string;
  text: string;
  sentAt: string;
}

const toChatMessage = (payload: ChatMessagePayload): ChatMessage => ({
  ...payload,
  sentAt: new Date(payload.sentAt),
});

@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly socket = inject(SocketService);
  private readonly roomApi = inject(RoomApiService);

  readonly messages = signal<ChatMessage[]>([]);

  constructor() {
    this.socket.on<{ messages: ChatMessagePayload[] }>('roomState', ({ messages }) => {
      this.messages.set(messages.map(toChatMessage));
    });

    this.socket.on<ChatMessagePayload>('chatMessage', (message) => {
      this.messages.update((list) => [...list, toChatMessage(message)]);
    });
  }

  applySnapshot(messages: ChatMessagePayload[]): void {
    this.messages.set(messages.map(toChatMessage));
  }

  send(text: string, author: string): void {
    const trimmed = text.trim();
    if (!trimmed) return;
    this.roomApi.postMessage(ROOM_ID, author, trimmed).subscribe();
  }
}
