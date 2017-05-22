import { } from 'jasmine';
import { async, inject } from '@angular/core/testing';

import { PICTUREPARK_URL, PictureparkModule, AuthService } from '../index';
import { testUrl, testUsername, testPassword, configureTest } from './config';

describe('AuthService', () => {
  beforeEach(configureTest);

  it('should add token on login', async(inject([AuthService],
    async (authService: AuthService) => {  
    // act
    await authService.login(testUsername, testPassword);

    // assert
    expect(authService.isLoggedIn).toBe(true);
    expect(authService.token).not.toBeNull;
    expect(authService.token).not.toBeUndefined;
  })));

  it('should receive token on login', async(inject([AuthService], 
    async (authService: AuthService) => {  

    // act
    await authService.login(testUsername, testPassword);

    // assert
    expect(authService.isLoggedIn).toBe(true);
    expect(authService.username).toBe(testUsername);
    expect(authService.token).toBeTruthy();
  })));

  it('should remove token on logout', async(inject([AuthService], 
    async (authService: AuthService) => {  
    
    // arrange
    await authService.login(testUsername, testPassword);

    // act
    await authService.logout();

    // assert
    expect(authService.isLoggedIn).toBe(false);
    expect(authService.username).toBe(null);
    expect(authService.token).toBeNull;
  })));

  it('should clean localStorage on clearStoredCredentials', async(inject([AuthService], 
    async (authService: AuthService) => {  
    
    // arrange
    await authService.login(testUsername, testPassword);

    // act
    authService.clearStoredCredentials();

    // assert
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i)!.indexOf('picturepark') !== -1)
        expect(localStorage.getItem(localStorage.key(i)!)).toBe('null');
    }

    for (let i = 0; i < sessionStorage.length; i++) {
      if (sessionStorage.key(i)!.indexOf('picturepark') !== -1)
        expect(sessionStorage.getItem(localStorage.key(i)!)).toBe('null');
    }
  })));
});
