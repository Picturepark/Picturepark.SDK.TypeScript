import { } from 'jasmine';
import { async, inject } from '@angular/core/testing';

import { PICTUREPARK_URL, PictureparkModule, AuthService, 
  UserService } from '../index';
import { testUrl, testUsername, testPassword, configureTest } from './config';

describe('UserService', () => {
  beforeEach(configureTest);

  it('should response with at least one channel', async(inject([AuthService, UserService], 
    async (authService: AuthService, userService: UserService) => {
    // arrange
    await authService.login(testUsername, testPassword);

    // act
    let channels = await userService.getChannels().toPromise();

    // assert
    expect(channels!.length).toBeGreaterThanOrEqual(1);
  })));

  it('should return translated channel', async(inject([AuthService, UserService], 
    async (authService: AuthService, userService: UserService) => {
    // arrange
    await authService.login(testUsername, testPassword);

    // act
    let channels = await userService.getChannels().toPromise();
    let channel = channels![0];

    // assert
    expect(channel!.names!.translate("en-US")).toBe("Root categories");
  })));
});