import { Component, OnInit, Input } from '@angular/core';

// INTERFACES
import { MenuItem } from './interfaces/menu-items.interface';

@Component({
  selector: 'pp-items-menu',
  templateUrl: './items-menu.component.html',
  styleUrls: ['./items-menu.component.scss']
})
export class ItemsMenuComponent implements OnInit {

  @Input() menuItems: MenuItem[];

  constructor() { }

  ngOnInit() {

    this.menuItems = [
      {
        name: 'Settings',
        link: '#settings',
        state: true,
      },
      {
        name: 'Items',
        link: '#items',
        state: false,
      },
      {
        name: 'Owner',
        link: '#owner',
        state: false,
      }
    ];

  }

}
