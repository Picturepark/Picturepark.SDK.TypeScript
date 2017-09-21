import { } from 'jasmine';
import { async, inject } from '@angular/core/testing';

import { PICTUREPARK_API_URL, UserService } from '../picturepark.services';
import { testUrl, testUsername, testPassword, configureTest } from './config';

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
    expect(channel!.names!.translate('en-US')).toBe('Root categories');
  })));
});