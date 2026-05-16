import { Component, input } from '@angular/core';
import { ChannelData } from '../../models/channels.model';
import { ChannelCard } from '../channel-card/channel-card';

@Component({
  selector: 'app-channel-list',
  imports: [ChannelCard],
  templateUrl: './channel-list.html',
  styleUrl: './channel-list.scss',
})
export class ChannelList {
  public readonly channelItems = input.required<ChannelData[]>();
}
