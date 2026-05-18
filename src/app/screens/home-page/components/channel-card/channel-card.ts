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

  name = computed(() => this.channel().name);
  description = computed(() => this.channel().description);
  coverUrl = computed(() => this.channel().coverUrl);
  category = computed(() => this.channel().category);
  viewers = computed(() =>  this.viewersPipe.transform(this.channel().viewers));
}
