import { computed, Injectable, signal } from '@angular/core';
import { PlaylistItem } from '../../shared/playlist/playlist-item.model';
import { extractVideoId } from '../../utils/extract-video-id';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  readonly playlist = signal<PlaylistItem[]>([]);
  readonly currentIndex = signal<number>(0);

  readonly videoId = computed(
    () => this.playlist()[this.currentIndex()]?.videoId ?? ''
  );

  add(url: string): void {
    const videoId = extractVideoId(url);
    if (!videoId) return;

    const item: PlaylistItem = { id: crypto.randomUUID(), videoId, url };
    this.playlist.update(list => [...list, item]);

    if (this.playlist().length === 1) {
      this.currentIndex.set(0);
    }
  }

  select(index: number): void {
    this.currentIndex.set(index);
  }

  remove(id: string): void {
    const index = this.playlist().findIndex(item => item.id === id);
    this.playlist.update(list => list.filter(item => item.id !== id));

    if (index < this.currentIndex()) {
      this.currentIndex.update(i => i - 1);
    } else if (index === this.currentIndex()) {
      this.currentIndex.set(Math.min(this.currentIndex(), this.playlist().length - 1));
    }
  }
}
