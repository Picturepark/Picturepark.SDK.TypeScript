import { Directive, Output, EventEmitter, ElementRef, NgZone, AfterViewInit, OnDestroy, OnInit } from '@angular/core';

@Directive({
  // tslint:disable-next-line
  selector: '[lazyload]'
})
export class LazyLoadDirective implements OnInit, OnDestroy, AfterViewInit {
  @Output() public lazyload: EventEmitter<any> = new EventEmitter();
  private intersectionObserver: IntersectionObserver;
  private element: any;

  constructor(
    private elementRef: ElementRef
  ) { }

  public ngOnInit() {
    this.element = this.elementRef.nativeElement;
  }

  public ngAfterViewInit() {
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    if ('IntersectionObserver' in window) {
      if (!this.intersectionObserver) {
        // Set up intersection observer
        this.intersectionObserver = new IntersectionObserver(entries => {
          this.onIntersection(entries);
        }, {});
      }
      if (this.intersectionObserver && this.element) {
        // Start observing an element
        this.intersectionObserver.observe(<Element>(this.element));
      }
    } else {
      this.load();
    }
  }

  public ngOnDestroy() {
    this.clear();
  }

  private onIntersection(entries: Array<IntersectionObserverEntry>) {
    // Loop through the entries
    entries.forEach((entry: IntersectionObserverEntry) => {
      // https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/isIntersecting
      if ((<any>entry).isIntersecting && entry.target === this.element) {
        this.load();

        // Stop observing an element
        this.intersectionObserver.unobserve(<Element>(this.element));
        this.clear();
      }
    });
  }

  private load(): void {
    this.lazyload.emit();
  }

  private clear() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }
}
