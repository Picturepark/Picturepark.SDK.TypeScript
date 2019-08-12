import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoaderService {

  private loaderSubject = new BehaviorSubject<boolean>(false);
  loaderSubscriber = this.loaderSubject.asObservable();

  constructor() { }

  setLoader(state: boolean) {
    this.loaderSubject.next(state);
  }

}
