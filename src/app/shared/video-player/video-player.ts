import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { PlaybackService } from '../../screens/room/playback.service';
import { YOUTUBE_PLAYER_CONFIG } from './youtube-player-config.token';

const YT_PLAYING = 1;
const YT_PAUSED = 2;

@Component({
  selector: 'app-video-player',
  imports: [YouTubePlayer],
  templateUrl: './video-player.html',
  styleUrl: './video-player.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPlayer {
  private readonly player = viewChild(YouTubePlayer);

  private readonly playback = inject(PlaybackService);
  private readonly config = inject(YOUTUBE_PLAYER_CONFIG);

  readonly videoId = input.required<string>();

  readonly playerVars = {
    autoplay: this.config.autoplay,
    controls: this.config.controls,
    rel: this.config.rel,
    modestbranding: this.config.modestbranding,
    fs: this.config.fs,
  };

  constructor() {
    effect(() => {
      const state = this.playback.remoteUpdate();
      const player = this.player();
      if (!state || !player) return;

      player.seekTo(state.currentTime, true);
      if (state.isPlaying) {
        player.playVideo();
      } else {
        player.pauseVideo();
      }
    });
  }

  onStateChange(event: { data: number }): void {
    if (event.data !== YT_PLAYING && event.data !== YT_PAUSED) return;

    this.playback.reportLocal(
      event.data === YT_PLAYING,
      this.player()?.getCurrentTime() ?? 0,
    );
  }
}
