import { Component, signal } from '@angular/core';
import { VideoPlayer } from '../../shared/video-player/video-player';

@Component({
  selector: 'app-room',
  imports: [VideoPlayer],
  templateUrl: './room.html',
  styleUrl: './room.scss',
})
export class Room {
  readonly videoId = signal('dQw4w9WgXcQ');
}
