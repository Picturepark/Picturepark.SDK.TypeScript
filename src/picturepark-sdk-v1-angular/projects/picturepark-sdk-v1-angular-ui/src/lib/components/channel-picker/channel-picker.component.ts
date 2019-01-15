import { Component, EventEmitter, Input, Output, OnInit, NgZone, ChangeDetectorRef, ApplicationRef, OnDestroy } from '@angular/core';

import { ChannelService, Channel } from '@picturepark/sdk-v1-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pp-channel-picker',
  templateUrl: './channel-picker.component.html'
})
export class ChannelPickerComponent implements OnInit, OnDestroy {
  @Input()
  public channel: Channel | null = null;
  @Output()
  public channelChange = new EventEmitter<Channel>();

  public channels: Channel[] = [];

  @Output()
  public channelsChange = new EventEmitter<Channel[]>();

  private subscription: Subscription = new Subscription();

  public constructor(private channelService: ChannelService, private ref: ApplicationRef) {
  }

  public ngOnInit(): void {
    const channelSubscription = this.channelService.getChannels().subscribe(
      (channels) => {
        this.channels = channels;

        this.channelsChange.emit(this.channels);

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
    this.subscription.add(channelSubscription);
  }

  public changeChannel(channel: Channel): void {
    this.channel = channel;
    this.channelChange.emit(this.channel);
  }

  public trackByChannel(index, channel: Channel) {
    return channel.id;
  }

  public ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
