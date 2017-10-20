import { Component, EventEmitter, Input, Output, OnChanges, SimpleChange, ViewChild, ElementRef, OnInit } from '@angular/core';
import { InputConverter, StringConverter } from '../converter';

import { UserService, Channel } from '@picturepark/sdk-v1-angular';

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

  constructor(private userService: UserService) {
  }

  async ngOnInit() {
    this.isLoading = true;
    try {
      this.channels = await this.userService.getChannels().toPromise();
      if (this.channels) {
        this.setChannel(this.channels[0].id!);
      }
      this.isLoading = false;
    } catch (error) {
      this.channels = [];
      this.isLoading = false;
    }
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    if (this.select && changes['channel']) {
      if (this.channels !== null && this.channels !== undefined) {
        const index = this.channels.indexOf(this.channels.filter(c => c.id === this.channel)[0]);
        if (this.currentIndex !== index) {
          this.currentIndex = index;
          setTimeout(() => { this.select.nativeElement.selectedIndex = index; }, 0);
        }
      }
    }
  }

  onChange(event: Event) {
    const index = (<any>event.currentTarget).selectedIndex;
    if (index !== -1) {
      if (index !== this.currentIndex) {
        this.currentIndex = index;
        if (this.channels) {
          this.setChannel(index >= 0 ? this.channels[index].id! : null);
        }
      }
    }
  }

  private setChannel(channel: string | null) {
    this.channel = channel;
    this.channelChange.emit(channel);
  }
}
