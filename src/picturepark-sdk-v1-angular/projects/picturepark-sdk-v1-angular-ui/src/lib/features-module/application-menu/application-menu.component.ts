import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pp-application-menu',
  templateUrl: './application-menu.component.html',
  styleUrls: ['./application-menu.component.scss']
})
export class ApplicationMenuComponent implements OnInit {

  menuOptions: any[] = [{
    name: 'Search',
    icon: 'search',
    link: ''
  },
  {
    name: 'Collections',
    icon: 'star_border',
    link: ''
  },
  {
    name: 'Shares',
    icon: 'share',
    link: 'share-manager'
  },
  {
    name: 'Transfers',
    icon: 'swap_horiz',
    link: ''
  },
  {
    name: 'Lists',
    icon: 'reorder',
    link: ''
  },
  {
    name: 'File Types',
    icon: 'insert_drive_file',
    link: ''
  },
  {
    name: 'Help',
    icon: 'contact_support',
    link: ''
  }];

  // VARS
  menuState: boolean = false;

  constructor() { }

  // EXPAND MENU
  expandMenu(): void {
    if (this.menuState) {
      this.menuState = false;
    } else {
      this.menuState = true;
    }
  }

  ngOnInit() {
  }

}
