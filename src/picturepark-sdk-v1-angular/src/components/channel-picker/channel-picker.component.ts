import { Component, EventEmitter, Input, Output, OnChanges, SimpleChange, ViewChild, ElementRef, OnInit } from '@angular/core';

import { InputConverter, StringConverter } from '../converter';
import { ChannelService, Channel } from '../../services/services';

@Component({
  selector: 'pp-channel-picker',
  templateUrl: './channel-picker.component.html'
})
export class ChannelPickerComponent implements OnInit, OnChanges {
  private isLoading = true;
  private currentIndex = -1; // used to avoid circular updates

  channels: Channel[] | null;

  @Input()
  label = '';

  @Input()
  @InputConverter(StringConverter)
  channel: string | null = '';
  @Output()
  channelChange = new EventEmitter<string | null>();

  @ViewChild('select')
  select: ElementRef;

  constructor(private channelService: ChannelService) {
  }

  ngOnInit() {
    this.isLoading = true;
    return this.channelService.getChannels().toPromise().then(channels => {
      this.channels = channels;
      if (this.channels) {
        this.changeChannel(this.channels[0].id!);
      }
      this.isLoading = false;
    }, error => {
      this.channels = [];
      this.isLoading = false;
    });
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    if (this.select && changes['channel']) {
      if (this.channels !== null && this.channels !== undefined) {
        const index = this.channels.indexOf(this.channels.filter(c => c.id === this.channel)[0]);
        if (this.currentIndex !== index) {
          this.currentIndex = index;
          setTimeout(() => {
            this.select.nativeElement.selectedIndex = index;
          }, 0);
        }
      }
    }
  }

  onChannelChanged(event: Event) {
    const index = (<any>event.currentTarget).selectedIndex;
    if (index !== -1) {
      if (index !== this.currentIndex) {
        this.currentIndex = index;
        if (this.channels) {
          this.changeChannel(index >= 0 ? this.channels[index].id! : null);
        }
      }
    }
  }

  private changeChannel(channel: string | null) {
    this.channel = channel;
    this.channelChange.emit(channel);
  }
}
