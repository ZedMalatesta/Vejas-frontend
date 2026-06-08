import { Component, input, computed } from '@angular/core';
import { ChannelData } from '../../../../models/channels.model';
import { ViewersPipe } from '../../../../core/pipes/viewers-pipe';

@Component({
  selector: 'app-channel-card',
  templateUrl: './channel-card.html',
  styleUrl: './channel-card.scss',
})
export class ChannelCard {
  readonly channel = input.required<ChannelData>();
  viewersPipe = new ViewersPipe();

  readonly name = computed(() => this.channel().name);
  readonly description = computed(() => this.channel().description);
  readonly coverUrl = computed(() => this.channel().coverUrl);
  readonly category = computed(() => this.channel().category);
  readonly viewers = computed(() => this.viewersPipe.transform(this.channel().viewers));
}
