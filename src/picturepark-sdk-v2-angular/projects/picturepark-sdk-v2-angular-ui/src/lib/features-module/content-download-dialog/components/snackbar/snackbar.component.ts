import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackBarInput } from '../../interfaces/snackbar.interfaces';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pp-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
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
