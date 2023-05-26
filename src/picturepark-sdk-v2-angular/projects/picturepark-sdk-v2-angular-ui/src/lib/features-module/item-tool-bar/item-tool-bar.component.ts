import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgFor } from '@angular/common';

@Component({
    selector: 'pp-item-tool-bar',
    templateUrl: './item-tool-bar.component.html',
    styleUrls: ['./item-tool-bar.component.scss'],
    standalone: true,
    imports: [NgFor],
})
export class ItemToolBarComponent implements OnInit {
  @Input() toolBarIcon = 'code';
  @Input() toolBarOptions: any[] = [];

  constructor(public dialog: MatDialog) {}

  fireAction(button: any): void {
    button.action();
  }

  ngOnInit() {}
}
