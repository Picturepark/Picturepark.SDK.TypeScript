import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SessionService, TranslationService } from '@picturepark/sdk-v2-angular-ui';
import { RouterOutlet } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, RouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(
    public sessionService: SessionService,
    private translationService: TranslationService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle(this.translationService.translate('ApplicationTitle.demoApp'));
  }
}
