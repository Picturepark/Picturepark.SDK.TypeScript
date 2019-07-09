import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pp-application-header',
  templateUrl: './application-header.component.html',
  styleUrls: ['./application-header.component.scss']
})
export class ApplicationHeaderComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
