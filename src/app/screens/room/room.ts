import { Component, inject, ChangeDetectionStrategy, signal, OnInit } from '@angular/core';
import { VideoPlayer } from '../../shared/video-player/video-player';
import { LinkInput } from '../../shared/link-input/link-input';
import { Playlist } from '../../shared/playlist/playlist';
import { Chat } from '../../shared/chat/chat';
import { PlaylistService } from './playlist.service';
import { RoomApiService } from '../../core/services/room-api.service';
import { ChatService } from './chat.service';

const ROOM_ID = 'demo-room';

@Component({
  selector: 'app-room',
  imports: [VideoPlayer, LinkInput, Playlist, Chat],
  templateUrl: './room.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './room.scss',
})
export class Room implements OnInit {
  protected readonly playlist = inject(PlaylistService);
  protected readonly isLoading = signal(true);
  protected readonly loadError = signal<string | null>(null);

  private readonly roomApi = inject(RoomApiService);
  private readonly chat = inject(ChatService);

  ngOnInit(): void {
    this.roomApi.getRoom(ROOM_ID).subscribe({
      next: (state) => {
        this.chat.applySnapshot(state.messages);
        this.playlist.applySnapshot(state.playlist, state.currentIndex);
        this.isLoading.set(false);
      },
      error: () => {
        this.loadError.set('Could not connect to server. Please try again.');
        this.isLoading.set(false);
      },
    });
  }
}
