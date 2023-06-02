import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslationService } from '@picturepark/sdk-v2-angular-ui';
import { RouterOutlet } from '@angular/router';
import { ApplicationHeaderComponent } from '../components/application-header/application-header.component';

@Component({
    selector: 'app-list-item-picker',
    templateUrl: './list-item-picker.component.html',
    standalone: true,
    imports: [ApplicationHeaderComponent, RouterOutlet],
})
export class ListItemPickerComponent implements OnInit {
  constructor(private titleService: Title, private translationService: TranslationService) {}

  ngOnInit() {
    // Set application Title
    this.titleService.setTitle(this.translationService.translate('ApplicationTitle.listBrowser'));
  }
}
