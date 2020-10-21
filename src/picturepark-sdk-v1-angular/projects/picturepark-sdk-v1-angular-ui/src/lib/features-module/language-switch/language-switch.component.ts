import { Component } from '@angular/core';
import { Language, LanguageService } from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'pp-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.scss'],
})
export class LanguageSwitchComponent {
  get languages(): Language[] {
    return this.languageService.languages;
  }
  get selectedLanguageCode(): string {
    return this.languageService.currentLanguage.ietf;
  }

  constructor(private languageService: LanguageService) {}

  public changeLanguage(languageCode: string) {
    this.languageService.changeCurrentLanguage(languageCode);
    window.location.reload();
  }
}
