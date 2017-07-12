import { Component, EventEmitter, Input, Output, Inject, LOCALE_ID } from '@angular/core';
import { InputConverter, BooleanConverter, StringConverter } from '../converter';

import { translate, TRANSLATIONS } from '../../translations';
import { AuthService } from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'pp-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent {
  errorMessage: string;

  @Output()
  loggedOut = new EventEmitter();

  constructor(public authService: AuthService, 
    @Inject(LOCALE_ID) private locale: string) {
  }

  async logout() {
    // try {
    //   await this.authService.logout();
    //   this.errorMessage = '';
    //   this.loggedOut.emit();
    // } catch (error) {
    //   this.errorMessage = translate(TRANSLATIONS.Logout.TextLogoutFailed, this.locale);
    // }
  }
}
