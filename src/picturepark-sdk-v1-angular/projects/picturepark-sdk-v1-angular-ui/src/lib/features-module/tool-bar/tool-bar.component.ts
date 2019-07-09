import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pp-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {

  @Input() toolBarOptions: any[] = [];

  constructor() { }

  displayLabel() {}

  ngOnInit() {}

}
