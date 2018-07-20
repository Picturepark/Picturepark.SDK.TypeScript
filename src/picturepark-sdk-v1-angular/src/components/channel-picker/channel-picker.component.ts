import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { ChannelService, Channel } from '../../services/services';

@Component({
  selector: 'pp-channel-picker',
  templateUrl: './channel-picker.component.html'
})
export class ChannelPickerComponent implements OnInit {
  @Input()
  public channel: Channel | null = null;
  @Output()
  public channelChange = new EventEmitter<Channel>();

  public channels: Channel[] = [];

  public constructor(private channelService: ChannelService) {
  }

  public ngOnInit(): void {
    this.channelService.getChannels().subscribe(
      (channels) => {
        this.channels = channels;
        if (this.channels) {
          this.changeChannel(this.channels[0]);
        }
      },
      () => {
        this.channels = [];
      });
  }

  public changeChannel(channel: Channel): void {
    this.channel = channel;
    this.channelChange.emit(this.channel);
  }
}
