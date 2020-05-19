import { OnDestroy, Injector, Directive } from '@angular/core';
import { Subscription } from 'rxjs';
import { LazyGetter } from 'lazy-get-decorator';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class BaseComponent implements OnDestroy {
  @LazyGetter()
  protected get breakpointObserver(): BreakpointObserver {
    return this.injector.get(BreakpointObserver);
  }

  protected subscription = new Subscription();

  public get deviceBreakpoint(): boolean {
    return this.breakpointObserver.isMatched([Breakpoints.Handset, Breakpoints.Tablet]);
  }

  @LazyGetter()
  public get isTouchDevice(): boolean {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  }

  public set sub(value: Subscription) {
    this.subscription.add(value);
  }

  constructor(protected injector: Injector) {}

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
