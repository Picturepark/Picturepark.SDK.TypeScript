import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgressBarService {
  public isVisible = new BehaviorSubject<boolean>(false);

  public show() {
    this.isVisible.next(true);
  }

  public hide() {
    this.isVisible.next(false);
  }
}
