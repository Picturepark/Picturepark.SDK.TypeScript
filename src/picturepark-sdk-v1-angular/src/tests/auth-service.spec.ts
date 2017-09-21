import { } from 'jasmine';
import { async, inject } from '@angular/core/testing';

import { PICTUREPARK_API_URL, PictureparkModule, AuthService } from '../../index';
import { testUrl, testUsername, testPassword, configureTest } from './config';

describe('AuthService', () => {
  beforeEach(configureTest);

  it('should add token on login', async(inject([AuthService],
    async (authService: AuthService) => {
      // act
      await authService.login();

      // assert
      expect(authService.isAuthorized).toBe(true);
      expect(authService.token).not.toBeNull();
      expect(authService.token).not.toBeUndefined();
    })));

  it('should receive token on login', async(inject([AuthService],
    async (authService: AuthService) => {

      // act
      await authService.login();

      // assert
      expect(authService.isAuthorized).toBe(true);
      expect(authService.username).toBe(testUsername);
      expect(authService.token).toBeTruthy();
    })));

  it('should remove token on logout', async(inject([AuthService],
    async (authService: AuthService) => {

      // arrange
      await authService.login();

      // act
      await authService.logout();

      // assert
      expect(authService.isAuthorized).toBe(false);
      expect(authService.username).toBe(undefined);
      expect(authService.token).toBeNull();
    })));
});
