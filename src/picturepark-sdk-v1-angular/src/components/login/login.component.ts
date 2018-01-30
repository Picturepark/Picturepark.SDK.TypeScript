import { Component, EventEmitter, Input, Output, LOCALE_ID, Inject } from '@angular/core';
import { InputConverter, BooleanConverter, StringConverter } from '../converter';

import { translate, TRANSLATIONS } from '../../utilities/translations';
import { AuthService } from '../../services/services';

@Component({
  selector: 'pp-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  errorMessage: string;

  @Input()
  @InputConverter(StringConverter)
  username = '';

  @Input()
  @InputConverter(StringConverter)
  password = '';

  @Input()
  @InputConverter(BooleanConverter)
  rememberPassword = true;

  @Input()
  @InputConverter(BooleanConverter)
  canRememberPassword = true;

  @Output()
  loggedIn = new EventEmitter();

  constructor(public authService: AuthService,
    @Inject(LOCALE_ID) private locale: string) {
    // if (this.authService.isLoggedIn)
    //   this.username = this.authService.username!;
  }

  login() {
    // try {
    //   await this.authService.login(this.username, this.password, this.rememberPassword);
    //   this.errorMessage = '';
    //   this.loggedIn.emit();
    // } catch (error) {
    //   this.errorMessage = translate(TRANSLATIONS.Login.TextWrongUsernameOrPassword, this.locale);
    // }
  }
}
