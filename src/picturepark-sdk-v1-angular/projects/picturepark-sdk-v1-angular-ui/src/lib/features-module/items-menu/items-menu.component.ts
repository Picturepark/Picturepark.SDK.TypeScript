import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pp-items-menu',
  templateUrl: './items-menu.component.html',
  styleUrls: ['./items-menu.component.css']
})
export class ItemsMenuComponent implements OnInit {

  @Input() menuOptions: string[]

  constructor() { }

  ngOnInit() {
  }

}
