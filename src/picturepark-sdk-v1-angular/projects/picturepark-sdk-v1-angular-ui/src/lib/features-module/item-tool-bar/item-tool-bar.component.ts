import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pp-item-tool-bar',
  templateUrl: './item-tool-bar.component.html',
  styleUrls: ['./item-tool-bar.component.scss']
})
export class ItemToolBarComponent implements OnInit {

  @Input() toolBarOptions: any[] = [];

  constructor() { }

  displayLabel() {}

  ngOnInit() {}

}
