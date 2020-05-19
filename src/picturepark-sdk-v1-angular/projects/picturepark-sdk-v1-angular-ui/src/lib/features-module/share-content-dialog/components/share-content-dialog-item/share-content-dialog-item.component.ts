import { SafeUrl, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, SecurityContext, Injector } from '@angular/core';
import { Subscription } from 'rxjs';

// COMPONENTS
import { BaseComponent } from '../../../../shared-module/components/base.component';

// SERVICES
import { Content } from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'pp-share-content-dialog-item',
  templateUrl: './share-content-dialog-item.component.html',
  styleUrls: ['./share-content-dialog-item.component.scss', './share-content-dialog-item-resp.component.scss'],
})
export class ShareContentDialogItemComponent extends BaseComponent implements OnDestroy {
  @Input()
  public item: Content;

  @Output() removeDialogContent = new EventEmitter<Content>();

  constructor(protected injector: Injector) {
    super(injector);
  }

  public remove() {
    this.removeDialogContent.emit(this.item);
  }
}
