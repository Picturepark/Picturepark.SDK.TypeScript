import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacySnackBarRef as MatSnackBarRef, MAT_LEGACY_SNACK_BAR_DATA as MAT_SNACK_BAR_DATA } from '@angular/material/legacy-snack-bar';
import { SnackBarInput } from '../../interfaces/snackbar.interfaces';

@Component({
  selector: 'pp-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent implements OnInit {
  displayText: string;
  showLoader: boolean;

  constructor(
    public snackBarRef: MatSnackBarRef<SnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackBarInput
  ) {}

  ngOnInit() {
    this.displayText = this.data.displayText;
    this.showLoader = this.data.showLoader || false;
  }
}
