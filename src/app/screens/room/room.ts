import { Component, computed, signal } from '@angular/core';
import { VideoPlayer } from '../../shared/video-player/video-player';
import { LinkInput } from '../../shared/link-input/link-input';
import { Playlist } from '../../shared/playlist/playlist';
import { PlaylistItem } from '../../shared/playlist/playlist-item.model';
import { extractVideoId } from '../../shared/video-player/extract-video-id';

@Component({
  selector: 'app-room',
  imports: [VideoPlayer, LinkInput, Playlist],
  templateUrl: './room.html',
  styleUrl: './room.scss',
})
export class Room {
  readonly playlist = signal<PlaylistItem[]>([]);
  readonly currentIndex = signal<number>(0);

  readonly videoId = computed(
    () => this.playlist()[this.currentIndex()]?.videoId ?? ''
  );

  onSubmit(url: string): void {
    const videoId = extractVideoId(url);
    if (!videoId) return;

    const item: PlaylistItem = { id: crypto.randomUUID(), videoId, url };
    this.playlist.update(list => [...list, item]);

    if (this.playlist().length === 1) {
      this.currentIndex.set(0);
    }
  }

  onSelect(index: number): void {
    this.currentIndex.set(index);
  }
}
