import { Component, OnInit, Output, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

// COMPONENTS
import { EventEmitter } from 'events';

@Component({
  selector: 'pp-item-tool-bar',
  templateUrl: './item-tool-bar.component.html',
  styleUrls: ['./item-tool-bar.component.scss']
})
export class ItemToolBarComponent implements OnInit {

  @Input() toolBarOptions: any[] = [];
  @Output() toolBarOutPutEvent = new EventEmitter();

  constructor(
    public dialog: MatDialog,
  ) { }

  fireAction(action: string): void {
    this.toolBarOutPutEvent.emit(action);
  }

  ngOnInit() {}

}
