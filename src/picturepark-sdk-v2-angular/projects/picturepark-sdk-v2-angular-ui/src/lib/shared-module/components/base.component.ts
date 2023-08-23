import { OnDestroy, Directive, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Directive()
export abstract class BaseComponent implements OnDestroy {
  breakpointObserver = inject(BreakpointObserver);

  protected subscription = new Subscription();

  get deviceBreakpoint(): boolean {
    return this.breakpointObserver.isMatched([Breakpoints.Handset, Breakpoints.Tablet]);
  }

  get isTouchDevice(): boolean {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  set sub(value: Subscription | undefined) {
    if (value !== undefined) this.subscription.add(value);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
