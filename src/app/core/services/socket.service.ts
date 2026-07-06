import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { supabase } from '../supabase/supabase';
import { environment } from '../../../environments/environment';

// TODO: replace with a real per-room id once room routing exists.
const DEFAULT_ROOM_ID = 'demo-room';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private readonly socket: Socket = io(environment.socketUrl, {
    auth: (cb: (data: Record<string, string>) => void) => {
      supabase.auth.getSession().then(({ data }) => {
        cb({ token: data.session?.access_token ?? '' });
      });
    },
  });
  private readonly roomId = DEFAULT_ROOM_ID;

  constructor() {
    this.socket.emit('joinRoom', { roomId: this.roomId });
  }

  emit(event: string, payload: Record<string, unknown> = {}): void {
    this.socket.emit(event, { roomId: this.roomId, ...payload });
  }

  on<T>(event: string, callback: (payload: T) => void): void {
    this.socket.on(event, callback);
  }

  off(event: string): void {
    this.socket.off(event);
  }
}
