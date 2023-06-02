import { Component, EventEmitter, Input, Output, OnInit, ApplicationRef } from '@angular/core';
import { ChannelService, Channel } from '@picturepark/sdk-v2-angular';
import { BaseComponent } from '../../shared-module/components/base.component';
import { TranslatePipe } from '../../shared-module/pipes/translate.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pp-channel-picker',
  templateUrl: './channel-picker.component.html',
  styleUrls: ['./channel-picker.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTooltipModule, MatMenuModule, TranslatePipe],
})
export class ChannelPickerComponent extends BaseComponent implements OnInit {
  @Input() channel: Channel | null = null;
  @Output() channelChange = new EventEmitter<Channel>();
  @Output() channelsChange = new EventEmitter<Channel[]>();

  channels: Channel[] = [];

  constructor(private channelService: ChannelService, private ref: ApplicationRef) {
    super();
  }

  ngOnInit(): void {
    this.sub = this.channelService.getAll().subscribe(
      channels => {
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
