import { Directive, Output, EventEmitter, ElementRef, AfterViewInit, OnDestroy, OnInit } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[lazyload]',
})
export class LazyLoadDirective implements OnInit, OnDestroy, AfterViewInit {
  @Output() lazyload: EventEmitter<any> = new EventEmitter();
  private intersectionObserver: IntersectionObserver;
  private element: Element;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.element = this.elementRef.nativeElement;
  }

  ngAfterViewInit() {
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    if ('IntersectionObserver' in window) {
      if (!this.intersectionObserver) {
        // Set up intersection observer
        this.intersectionObserver = new IntersectionObserver((entries) => this.onIntersection(entries), {});
      }
      if (this.intersectionObserver && this.element) {
        // Start observing an element
        this.intersectionObserver.observe(this.element);
      }
    } else {
      this.load();
    }
  }

  ngOnDestroy() {
    this.clear();
  }

  private onIntersection(entries: IntersectionObserverEntry[]) {
    // Loop through the entries
    entries.forEach((entry) => {
      // https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/isIntersecting
      if (entry.isIntersecting && entry.target === this.element) {
        this.load();

        // Stop observing an element
        this.intersectionObserver.unobserve(this.element);
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
