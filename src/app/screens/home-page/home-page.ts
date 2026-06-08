import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChannelList } from './components/channel-list/channel-list';
import { Header } from '../../shared/header/header';

@Component({
  selector: 'app-home-page',
  imports: [ChannelList, Header],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {}
