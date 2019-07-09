import { Component, OnInit, OnDestroy, Inject, ChangeDetectorRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, Subscription, combineLatest } from 'rxjs';
import { map, distinctUntilChanged, tap, take } from 'rxjs/operators';
import { MatDialog } from '@angular/material';

// LIBRARIES
import {
  SchemaDetail, FilterBase, SchemaService, AuthService,
  AggregationFilter, AggregatorBase, OrFilter, AndFilter
} from '@picturepark/sdk-v1-angular';
import { OidcAuthService } from '@picturepark/sdk-v1-angular-oidc';
import * as lodash from 'lodash';

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
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private schemaService: SchemaService,
    @Inject(AuthService) public authService: OidcAuthService
  ) {}

  ngOnInit() {

    if (!this.authService.isAuthenticated) {
      this.authService.login('/list-item-picker');
    }

    // tslint:disable-next-line: deprecation
    const listSubscription = combineLatest(this.schema, this.route.paramMap, this.route.queryParamMap)
      .pipe(take(1))
      .subscribe(([schemaDetail, paramMap, queryParamMap]) => {

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
