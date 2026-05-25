import { Component, input, output } from '@angular/core';
import { PlaylistItem } from './playlist-item.model';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.html',
  styleUrl: './playlist.scss',
})
export class Playlist {
  readonly items = input<PlaylistItem[]>([]);
  readonly currentIndex = input<number>(0);

  readonly select = output<number>();
}
