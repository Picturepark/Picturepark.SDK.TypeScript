import {} from 'jasmine';
import { inject, waitForAsync } from '@angular/core/testing';

import { configureTest } from './config';
import { AuthService } from '../lib/services/auth.service';
import { ChannelService } from '../lib/services/api-services';
import { lastValueFrom } from 'rxjs';

describe('ChannelService', () => {
  beforeEach(configureTest);

  it('should response with at least one channel', waitForAsync(
    inject([AuthService, ChannelService], async (authService: AuthService, channelService: ChannelService) => {
      // arrange

      // act
      const channels = await lastValueFrom(channelService.getAll());

      // assert
      expect(channels?.length).toBeGreaterThanOrEqual(1);
    })
  ));

  it('should return translated channel', waitForAsync(
    inject([ChannelService], async (channelService: ChannelService) => {
      // arrange

      // act
      const channels = await lastValueFrom(channelService.getAll());
      const channel = channels?.find(i => i.id === 'rootChannel');

      // assert
      expect(channel?.names.translate('en-US')).toBe('Root Channel');
    })
  ));
});
