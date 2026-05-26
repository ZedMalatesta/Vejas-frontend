import { Component, inject } from '@angular/core';
import { VideoPlayer } from '../../shared/video-player/video-player';
import { LinkInput } from '../../shared/link-input/link-input';
import { Playlist } from '../../shared/playlist/playlist';
import { PlaylistService } from './playlist.service';

@Component({
  selector: 'app-room',
  imports: [VideoPlayer, LinkInput, Playlist],
  providers: [PlaylistService],
  templateUrl: './room.html',
  styleUrl: './room.scss',
})
export class Room {
  protected readonly playlist = inject(PlaylistService);
}
