import { Component, OnInit, Inject, Injector } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';

// LIBRARIES
import { SchemaDetail, AuthService } from '@picturepark/sdk-v1-angular';
import { OidcAuthService } from '@picturepark/sdk-v1-angular-oidc';
import { BaseComponent } from '@picturepark/sdk-v1-angular-ui';

@Component({
  selector: 'app-list-item-browser',
  templateUrl: './list-item-browser.component.html',
  styleUrls: ['./list-item-browser.component.scss'],
})
export class ListItemBrowserComponent extends BaseComponent implements OnInit {
  activeSchema = new Subject<SchemaDetail>();
  schema = new Observable<SchemaDetail>();

  constructor(
    injector: Injector,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(AuthService) public authService: OidcAuthService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.sub = combineLatest([this.schema, this.route.paramMap, this.route.queryParamMap])
      .pipe(take(1))
      .subscribe(([schemaDetail]) => {
        this.activeSchema.next(schemaDetail);
      });
  }

  updateUrl(params: Params): void {
    this.router.navigate([], { queryParams: params, relativeTo: this.route });
  }
}
