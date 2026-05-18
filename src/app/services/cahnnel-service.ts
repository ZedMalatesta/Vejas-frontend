import { computed, Injectable, signal } from '@angular/core';
import { CHANNELS_MOCK_DATA } from '../models/channels.data';
import { ChannelData } from '../models/channels.model';

@Injectable({
  providedIn: 'root',
})
export class CahnnelService {
  private channels = signal<ChannelData[]>(CHANNELS_MOCK_DATA);
  searchQuery = signal<string>('');

  filteredChannels = computed(() => {
    const query = this.searchQuery().toLowerCase();
    return this.channels().filter((channel) =>
      channel.name.toLowerCase().includes(query)
    );
  });

  setSearchQuery(query: string) {
    this.searchQuery.set(query);
  }

  getChannels() {
    return this.channels();
  }

  getChannelById(id: number) {
    return this.channels().find((channel) => channel.id === id);
  }
}
