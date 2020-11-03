import { Directive, Output, EventEmitter, HostListener, Input, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[ppMobileTouch]',
})
export class MobileTouchDirective {
  @Input() pressTime = 400;
  @Output() public ppPress: EventEmitter<MouseEvent> = new EventEmitter();
  @Output() public ppClick: EventEmitter<MouseEvent> = new EventEmitter();

  isLongPress = false;
  pressTimer: number;

  constructor(private elementRef: ElementRef) {}

  @HostListener('touchstart')
  public onMouseDown(): void {
    this.isLongPress = false;
    this.pressTimer = window.setTimeout(() => {
      this.isLongPress = true;
    }, this.pressTime);
  }

  @HostListener('click', ['$event'])
  @HostListener('document:contextmenu ', ['$event'])
  public onMouseUp(event: MouseEvent): void {
    const isDescendant = this.isDescendant(event.target as HTMLElement, this.elementRef.nativeElement);
    if (event.type === 'contextmenu' && !isDescendant) {
      return;
    }

    clearTimeout(this.pressTimer);
    if (this.isLongPress) {
      this.ppPress.emit(event);
    } else {
      this.ppClick.emit(event);
    }
    this.isLongPress = false;
  }

  isDescendant(el: HTMLElement, parentElement: HTMLElement) {
    let isChild = false;

    if (el === parentElement) {
      isChild = true;
    }

    while ((el = el.parentNode as HTMLElement)) {
      if (el === parentElement) {
        isChild = true;
      }
    }

    return isChild;
  }
}
