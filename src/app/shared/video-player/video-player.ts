import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { YOUTUBE_PLAYER_CONFIG } from './youtube-player-config.token';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.html',
  styleUrl: './video-player.scss',
})
export class VideoPlayer {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly config = inject(YOUTUBE_PLAYER_CONFIG);

  readonly videoId = input.required<string>();

  readonly embedUrl = computed(() => {
    const params = new URLSearchParams({
      autoplay: String(this.config.autoplay),
      controls: String(this.config.controls),
      rel: String(this.config.rel),
      modestbranding: String(this.config.modestbranding),
      fs: String(this.config.fs),
    });
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.videoId()}?${params}`
    );
  });
}
