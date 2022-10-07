import { Component, EventEmitter, Input, Output, OnInit, ApplicationRef, Injector } from '@angular/core';

// LIBRARIES
import { ChannelService, Channel, LocalStorageService, StorageKey } from '@picturepark/sdk-v2-angular';

// COMPONENTS
import { BaseComponent } from '../../shared-module/components/base.component';

@Component({
  selector: 'pp-channel-picker',
  templateUrl: './channel-picker.component.html',
  styleUrls: ['./channel-picker.component.scss'],
})
export class ChannelPickerComponent extends BaseComponent implements OnInit {
  @Input() channel: Channel | null = null;
  @Output() channelChange = new EventEmitter<Channel>();
  @Output() channelsChange = new EventEmitter<Channel[]>();

  channels: Channel[] = [];

  constructor(
    private channelService: ChannelService,
    private ref: ApplicationRef,
    protected injector: Injector,
    private localStorageService: LocalStorageService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.sub = this.channelService.getAll().subscribe(
      channels => {
        this.channels = channels;

        this.channelsChange.emit(this.channels);

        this.ref.tick();

        if (this.channels && !this.channel)
          this.changeChannel(
            this.channels.find(c => c.id === this.localStorageService.get(StorageKey.ActiveChannel)) || this.channels[0]
          );
      },
      () => {
        this.channels = [];
      }
    );
  }

  changeChannel(channel: Channel): void {
    this.channel = channel;
    this.channelChange.emit(this.channel);
  }

  trackByChannel(index, channel: Channel) {
    return channel.id;
  }
}
