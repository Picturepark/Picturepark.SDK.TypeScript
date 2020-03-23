import { OnDestroy, Injector } from '@angular/core';
import { Subscription } from 'rxjs';
import { LazyGetter } from 'lazy-get-decorator';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

export abstract class BaseComponent implements OnDestroy {
  @LazyGetter()
  protected get breakpointObserver(): BreakpointObserver {
      return this.injector.get(BreakpointObserver);
  }

  protected subscription = new Subscription();

  public get deviceBreakpoint(): boolean {
    return this.breakpointObserver.isMatched([Breakpoints.Handset, Breakpoints.Tablet]);
  }

  public get isTouchDevice(): boolean {
    return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
  }

  constructor(protected injector: Injector) { }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
