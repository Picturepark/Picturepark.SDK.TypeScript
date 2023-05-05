import { Component, OnInit, Input } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';

@Component({
  selector: 'pp-item-tool-bar',
  templateUrl: './item-tool-bar.component.html',
  styleUrls: ['./item-tool-bar.component.scss'],
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
