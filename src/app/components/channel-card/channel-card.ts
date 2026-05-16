import { Component, input, computed } from '@angular/core';
import { ChannelData } from '../../models/channels.model';
import { NumbersShortPipe } from '../../pipes/numbers-short-pipe';

@Component({
  selector: 'app-channel-card',
  templateUrl: './channel-card.html',
  styleUrl: './channel-card.scss',
})
export class ChannelCard {
  readonly channel = input.required<ChannelData>();
  numPipe = new NumbersShortPipe();

  name = computed(() => this.channel().name);
  description = computed(() => this.channel().description);
  coverUrl = computed(() => this.channel().coverUrl);
  category = computed(() => this.channel().category);
  viewers = computed(() =>  this.numPipe.transform(this.channel().viewers));
}
