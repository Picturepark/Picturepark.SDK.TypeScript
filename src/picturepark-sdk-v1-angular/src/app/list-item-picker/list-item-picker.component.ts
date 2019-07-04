import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-item-picker',
  templateUrl: './list-item-picker.component.html',
  styleUrls: ['./list-item-picker.component.scss']
})
export class ListItemPickerComponent {

  schema = null;
  search = '';
  filter = null;
  enableSelection = true;
  refreshAll = new Subject<string>();
  deselectAll = new Subject<string>();

  constructor() { }

  selectedItemsChange(event): void {
    console.log(event);
  }

}

