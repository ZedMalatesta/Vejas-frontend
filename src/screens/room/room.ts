import { Component, signal } from '@angular/core';
import { VideoPlayer } from '../../shared/video-player/video-player';
import { TextInput } from '../../shared/text-input/text-input';
import { extractVideoId } from '../../shared/video-player/extract-video-id';

@Component({
  selector: 'app-room',
  imports: [VideoPlayer, TextInput],
  templateUrl: './room.html',
  styleUrl: './room.scss',
})
export class Room {
  readonly videoId = signal('dQw4w9WgXcQ');

  onSubmit(url: string): void {
    const id = extractVideoId(url);
    if (id) this.videoId.set(id);
  }
}
