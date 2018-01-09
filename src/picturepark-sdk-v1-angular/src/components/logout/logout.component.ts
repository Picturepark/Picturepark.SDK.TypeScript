import { Component, EventEmitter, Input, Output, Inject, LOCALE_ID } from '@angular/core';
import { InputConverter, BooleanConverter, StringConverter } from '../converter';

import { AuthService } from '../../services/picturepark.services';
import { translate, TRANSLATIONS } from '../../utilities/translations';

@Component({
  selector: 'pp-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent {
  errorMessage: string;

  @Output()
  loggedOut = new EventEmitter();

  constructor( @Inject(AuthService) public authService: AuthService,
    @Inject(LOCALE_ID) private locale: string) {
    if (!(<any>authService).logout) {
      throw new Error('The pp-logout (LogoutComponent) component must be used with the OidcAuthService service.');
    }
  }

  logout() {
    return (<any>this.authService).logout().then(() => {
      this.errorMessage = '';
      this.loggedOut.emit();
    }, (error) => {
      this.errorMessage = translate(TRANSLATIONS.Logout.TextLogoutFailed, this.locale);
    });
  }
}
