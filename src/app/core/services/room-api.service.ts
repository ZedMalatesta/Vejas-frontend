import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import type { Observable } from 'rxjs';
import type { ChatMessage } from '../../shared/chat/chat-message.model';
import type { PlaylistItem } from '../../shared/playlist/playlist-item.model';

export interface RoomState {
  playlist: PlaylistItem[];
  currentIndex: number;
  isPlaying: boolean;
  currentTime: number;
  messages: Array<Omit<ChatMessage, 'sentAt'> & { sentAt: string }>;
}

@Injectable({ providedIn: 'root' })
export class RoomApiService {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl;

  getRoom(id: string): Observable<RoomState> {
    return this.http.get<RoomState>(`${this.base}/rooms/${id}`);
  }

  postMessage(id: string, author: string, text: string): Observable<ChatMessage> {
    return this.http.post<ChatMessage>(`${this.base}/rooms/${id}/messages`, {
      author,
      text,
    });
  }
}
