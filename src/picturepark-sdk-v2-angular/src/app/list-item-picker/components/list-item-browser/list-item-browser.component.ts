import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';

// LIBRARIES
import { SchemaDetail, AuthService } from '@picturepark/sdk-v2-angular';
import { OidcAuthService } from '@picturepark/sdk-v2-angular-oidc';
import { BaseComponent } from '@picturepark/sdk-v2-angular-ui';
import { ListComponent } from '../../../../../projects/picturepark-sdk-v2-angular-ui/src/lib/features-module/list-items/list/list.component';

@Component({
    selector: 'app-list-item-browser',
    templateUrl: './list-item-browser.component.html',
    styleUrls: ['./list-item-browser.component.scss'],
    standalone: true,
    imports: [ListComponent],
})
export class ListItemBrowserComponent extends BaseComponent implements OnInit {
  activeSchema = new Subject<SchemaDetail>();
  schema = new Observable<SchemaDetail>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject(AuthService) public authService: OidcAuthService
  ) {
    super();
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
