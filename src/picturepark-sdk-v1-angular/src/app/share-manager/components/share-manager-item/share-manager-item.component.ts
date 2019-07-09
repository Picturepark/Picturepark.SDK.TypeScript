import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-share-manager-item',
  templateUrl: './share-manager-item.component.html',
  styleUrls: ['./share-manager-item.component.scss']
})
export class ShareManagerItemComponent implements OnInit, OnDestroy {

  susbcriptions: Subscription;

  // VARS
  toolBarOptions: any[];

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    // ROUTE SUBSCRIBER
    const activatedRoute = this.activatedRoute.params.subscribe(params => {
      console.log(params);
    });

    // ADD TO SUBSCRIBERS
    this.susbcriptions.add(activatedRoute);

  }

  ngOnDestroy() {

    // UNSUBSCRIBE
    if (this.susbcriptions) {
      this.susbcriptions.unsubscribe();
    }

  }

}
