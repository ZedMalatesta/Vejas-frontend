import { Component, signal, WritableSignal } from '@angular/core';
import { VideoPlayer } from '../../shared/video-player/video-player';
import { LinkInput } from '../../shared/link-input/link-input';
import { extractVideoId } from '../../shared/video-player/extract-video-id';

@Component({
  selector: 'app-room',
  imports: [VideoPlayer, LinkInput],
  templateUrl: './room.html',
  styleUrl: './room.scss',
})
export class Room {
  readonly videoId: WritableSignal<string> = signal('dQw4w9WgXcQ');

  onSubmit(url: string): void {
    const id = extractVideoId(url);
    if (id) this.videoId.set(id);
  }
}
