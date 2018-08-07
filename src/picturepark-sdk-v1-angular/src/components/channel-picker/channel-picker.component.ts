import { Component, EventEmitter, Input, Output, OnInit, NgZone, ChangeDetectorRef, ApplicationRef } from '@angular/core';

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

  @Output()
  public channelsChange = new EventEmitter<Channel[]>()

  public constructor(private channelService: ChannelService, private ref: ApplicationRef) {
  }

  public ngOnInit(): void {
    this.channelService.getChannels().subscribe(
      (channels) => {
        this.channels = channels;

        this.channelsChange.emit(this.channels);

        // TODO: check whether it can be dangerous.
        this.ref.tick();

        if (this.channels) {
          if (!this.channel) {
            this.changeChannel(this.channels[0]);
          }
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
