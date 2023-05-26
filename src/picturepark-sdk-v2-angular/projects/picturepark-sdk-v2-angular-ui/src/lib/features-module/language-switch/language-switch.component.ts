import { Component } from '@angular/core';
import { Language, LanguageService } from '@picturepark/sdk-v2-angular';
import { TranslatePipe } from '../../shared-module/pipes/translate.pipe';
import { NgFor, UpperCasePipe } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'pp-language-switch',
    templateUrl: './language-switch.component.html',
    styleUrls: ['./language-switch.component.scss'],
    standalone: true,
    imports: [
        MatButtonModule,
        MatMenuModule,
        NgFor,
        UpperCasePipe,
        TranslatePipe,
    ],
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

  changeLanguage(languageCode: string) {
    this.languageService.changeCurrentLanguage(languageCode, true);
    window.location.reload();
  }
}
