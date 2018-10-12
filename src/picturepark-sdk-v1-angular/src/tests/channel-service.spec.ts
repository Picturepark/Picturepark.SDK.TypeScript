import { } from 'jasmine';
import { async, inject } from '@angular/core/testing';

import { ChannelService, AuthService } from '@picturepark/sdk-v1-angular';
import { configureTest } from './config';

describe('ChannelService', () => {
  beforeEach(configureTest);

  it('should response with at least one channel', async(inject([AuthService, ChannelService],
    async (authService: AuthService, channelService: ChannelService) => {
    // arrange
    console.log(authService);
    console.log(channelService);
    // act
    const channels = await channelService.getChannels().toPromise();

    // assert
    expect(channels.length).toBeGreaterThanOrEqual(1);
  })));

  it('should return translated channel', async(inject([ChannelService],
    async (channelService: ChannelService) => {
    // arrange

    // act
    const channels = await channelService.getChannels().toPromise();
    const channel = channels[0];

    // assert
    expect(channel!.names!.translate('en-US')).toBe('Root Channel');
  })));
});
