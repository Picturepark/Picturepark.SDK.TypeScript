import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-item-browser',
  templateUrl: './list-item-browser.component.html',
  styleUrls: ['./list-item-browser.component.css']
})
export class ListItemBrowserComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      console.log(params)
    });
  }

}
