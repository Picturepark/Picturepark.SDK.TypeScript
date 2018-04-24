import { } from 'jasmine';
import { async, inject } from '@angular/core/testing';

import { UserService } from '../services/services';
import { configureTest } from './config';

describe('UserService', () => {
  beforeEach(configureTest);

  it('should response with at least one channel', async(inject([UserService],
    async (userService: UserService) => {
    // arrange

    // act
    const channels = await userService.getChannels().toPromise();

    // assert
    expect(channels!.length).toBeGreaterThanOrEqual(1);
  })));

  it('should return translated channel', async(inject([UserService],
    async (userService: UserService) => {
    // arrange

    // act
    const channels = await userService.getChannels().toPromise();
    const channel = channels![0];

    // assert
    expect(channel!.names!.translate('en-US')).toBe('Root Channel');
  })));
});