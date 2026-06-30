import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private readonly socket: Socket = io(SOCKET_URL);
  private roomId: string | null = null;

  joinRoom(roomId: string): void {
    this.roomId = roomId;
    this.socket.emit('joinRoom', { roomId });
  }

  emit(event: string, payload: Record<string, unknown> = {}): void {
    if (!this.roomId) return;
    this.socket.emit(event, { roomId: this.roomId, ...payload });
  }

  on<T>(event: string, callback: (payload: T) => void): void {
    this.socket.on(event, callback);
  }

  off(event: string): void {
    this.socket.off(event);
  }
}
