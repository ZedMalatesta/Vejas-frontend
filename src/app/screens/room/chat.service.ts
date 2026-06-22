import { Injectable, signal } from '@angular/core';
import { ChatMessage } from '../../shared/chat/chat-message.model';

const now = new Date();
const minutesAgo = (m: number): Date => new Date(now.getTime() - m * 60_000);

const MOCK_MESSAGES: ChatMessage[] = [
  { id: '1', author: 'Archer',  text: "Do you want ants? Because that's how you get ants.", sentAt: minutesAgo(18) },
  { id: '2', author: 'Lana',    text: 'LANAAAAAA',                                           sentAt: minutesAgo(15) },
  { id: '3', author: 'Malory',  text: 'Sterling, language.',                                 sentAt: minutesAgo(11) },
  { id: '4', author: 'Pam',     text: 'Oh my god, that is so fetch',                         sentAt: minutesAgo(7)  },
  { id: '5', author: 'Cyril',   text: "You can't just do that, Archer",                      sentAt: minutesAgo(4)  },
  { id: '6', author: 'Archer',  text: 'Just did.',                                           sentAt: minutesAgo(1)  },
];

@Injectable({ providedIn: 'root' })
export class ChatService {
  readonly messages = signal<ChatMessage[]>([...MOCK_MESSAGES]);

  send(text: string, author: string): void {
    const message: ChatMessage = {
      id: crypto.randomUUID(),
      author,
      text: text.trim(),
      sentAt: new Date(),
    };
    this.messages.update(list => [...list, message]);
  }
}
