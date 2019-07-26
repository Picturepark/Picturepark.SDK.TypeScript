import { Component, OnInit, OnDestroy, Inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, Subscription, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';


// LIBRARIES
import {
  SchemaDetail, SchemaService, AuthService,

} from '@picturepark/sdk-v1-angular';
import { OidcAuthService } from '@picturepark/sdk-v1-angular-oidc';


@Component({
  selector: 'app-list-item-browser',
  templateUrl: './list-item-browser.component.html',
  styleUrls: ['./list-item-browser.component.scss']
})
export class ListItemBrowserComponent implements OnInit, OnDestroy {

  activeSchema = new Subject<SchemaDetail>();
  schema = new Observable<SchemaDetail>();
  subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    @Inject(AuthService) public authService: OidcAuthService
  ) {}

  ngOnInit() {

    if (!this.authService.isAuthenticated) {
      this.authService.login('/list-item-picker');
    }

    // tslint:disable-next-line: deprecation
    const listSubscription = combineLatest(this.schema, this.route.paramMap, this.route.queryParamMap)
      .pipe(take(1))
      .subscribe(([schemaDetail]) => {

        this.activeSchema.next(schemaDetail);
      });

     this.subscription.add(listSubscription);
  }

  ngOnDestroy() {
    // UNSUBSCRIBE
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
