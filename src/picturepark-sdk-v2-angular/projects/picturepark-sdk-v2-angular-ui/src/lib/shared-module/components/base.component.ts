import { OnDestroy, Injector, Directive, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { LazyGetter } from 'lazy-get-decorator';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Directive()
export abstract class BaseComponent implements OnDestroy {
  protected injector = inject(Injector);

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

  set sub(value: Subscription | undefined) {
    if (value !== undefined) this.subscription.add(value);
  }

  constructor() {}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
