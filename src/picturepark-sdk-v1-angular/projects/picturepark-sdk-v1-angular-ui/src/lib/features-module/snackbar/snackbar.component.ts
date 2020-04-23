import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'pp-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent implements OnInit {
  constructor(
    private snackbarRef: MatBottomSheetRef<SnackbarComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {}

  title: string;
  clearBar(): void {
    this.snackbarRef.dismiss();
    // event.preventDefault();
  }

  changeStatus() {
    this.snackbarRef.dismiss({
      message: 'Change Status',
      data: this.data,
    });
  }

  ngOnInit() {
    console.log('data received', this.data);
  }
}
