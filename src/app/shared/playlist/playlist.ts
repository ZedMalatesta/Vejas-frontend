import { Component, input, output } from '@angular/core';
import { PlaylistItem } from './playlist-item.model';
import { ScrollIntoViewDirective } from './scroll-into-view.directive';

@Component({
  selector: 'app-playlist',
  imports: [ScrollIntoViewDirective],
  templateUrl: './playlist.html',
  styleUrl: './playlist.scss',
})
export class Playlist {
  readonly items = input<PlaylistItem[]>([]);
  readonly currentIndex = input<number>(0);

  readonly select = output<number>();
  readonly remove = output<string>();
}
