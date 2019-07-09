import { OnInit, Input, OnChanges } from '@angular/core';

export class PanelBaseComponent implements OnInit {

  // VARS
  @Input() title: string;
  menuItems: string[] = [];

  constructor() { }

  ngOnInit() {}

}
