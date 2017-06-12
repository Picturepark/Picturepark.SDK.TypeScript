import { Component, EventEmitter, Input, Output, LOCALE_ID, Inject } from '@angular/core';
import { InputConverter, BooleanConverter, StringConverter } from '../converter';

import { translate, TRANSLATIONS } from '../../translations';
import { AuthService } from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'pp-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  errorMessage: string;

  @Input()
  @InputConverter(StringConverter)
  username: string = '';

  @Input()
  @InputConverter(StringConverter)
  password: string = '';

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
    if (this.authService.isLoggedIn)
      this.username = this.authService.username!;
  }

  async login() {
    try {
      await this.authService.login(this.username, this.password, this.rememberPassword);
      this.errorMessage = '';
      this.loggedIn.emit();
    } catch (error) {
      this.errorMessage = translate(TRANSLATIONS.Login.TextWrongUsernameOrPassword, this.locale);
    }
  }
}
