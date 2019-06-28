import { Component, OnInit } from '@angular/core';

// COMPONENTS
import { DialogBaseComponent } from '../dialog/dialog.component';

@Component({
  selector: 'pp-share-dialog-component',
  templateUrl: './share-dialog-component.component.html',
  styleUrls: ['./share-dialog-component.component.css']
})
export class ShareDialogComponentComponent extends DialogBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {}

}
