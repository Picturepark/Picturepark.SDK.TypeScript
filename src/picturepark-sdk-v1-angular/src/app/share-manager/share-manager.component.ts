import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslationService } from '@picturepark/sdk-v1-angular-ui';

@Component({
  selector: 'app-share-manager',
  templateUrl: './share-manager.component.html',
  styleUrls: ['./share-manager.component.scss'],
})
export class ShareBrowserComponent implements OnInit {
  constructor(private titleService: Title, private translationService: TranslationService) {}

  ngOnInit() {
    // Set application Title
    this.titleService.setTitle(this.translationService.translate('ApplicationTitle.shareManager'));
  }
}
