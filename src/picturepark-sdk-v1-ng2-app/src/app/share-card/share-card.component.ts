import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './share-card.component.html'
})
export class ShareCardComponent implements OnInit {
  token: string; 

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.token = this.route.snapshot.params["token"];
  }
}
