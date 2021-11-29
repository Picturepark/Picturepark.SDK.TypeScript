import { OnDestroy, Injector, Directive } from '@angular/core';
import { Subscription } from 'rxjs';
import { LazyGetter } from 'lazy-get-decorator';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Directive()
export abstract class BaseComponent implements OnDestroy {
  @LazyGetter()
  protected get breakpointObserver(): BreakpointObserver {
    return this.injector.get(BreakpointObserver);
  }

  protected subscription = new Subscription();

  get deviceBreakpoint(): boolean {
    return this.breakpointObserver.isMatched([Breakpoints.Handset, Breakpoints.Tablet]);
  }

  @LazyGetter()
  get isTouchDevice(): boolean {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  set sub(value: Subscription) {
    this.subscription.add(value);
  }

  constructor(protected injector: Injector) {}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
