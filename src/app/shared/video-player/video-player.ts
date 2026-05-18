import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.html',
  styleUrl: './video-player.scss',
})
export class VideoPlayer {
  private readonly sanitizer = inject(DomSanitizer);

  readonly videoId = input.required<string>();

  readonly embedUrl = computed(() =>
    this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.videoId()}`
    )
  );
}
