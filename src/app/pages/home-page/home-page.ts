import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ChannelList } from '../../components/channel-list/channel-list';
import { CahnnelService } from '../../services/cahnnel-service';

@Component({
  selector: 'app-home-page',
  imports: [ChannelList],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  private channelService = inject(CahnnelService);

  channels = this.channelService.getChannels();
}
