import { Component } from '@angular/core';
import { Language, LanguageService } from '@picturepark/sdk-v1-angular';
import { TranslatePipe } from '../../shared-module/pipes/translate.pipe';

@Component({
  selector: 'pp-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.scss'],
})
export class LanguageSwitchComponent {
  languages: Language[];

  get selectedLanguageCode(): string {
    return this.languageService.currentLanguage.ietf;
  }

  constructor(private languageService: LanguageService, translatePipe: TranslatePipe) {
    this.languages = this.languageService.languages.sort((a, b) =>
      translatePipe.transform(a.name) < translatePipe.transform(b.name) ? -1 : 1
    );
  }

  public changeLanguage(languageCode: string) {
    this.languageService.changeCurrentLanguage(languageCode, true);
    window.location.reload();
  }
}
