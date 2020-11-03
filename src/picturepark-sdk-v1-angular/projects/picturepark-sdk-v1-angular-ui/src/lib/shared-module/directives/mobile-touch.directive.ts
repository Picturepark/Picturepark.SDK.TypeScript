import { Directive, Output, EventEmitter, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[ppMobileTouch]',
})
export class MobileTouchDirective {
  @Input() pressTime = 400;
  @Output() public ppPress: EventEmitter<MouseEvent> = new EventEmitter();
  @Output() public ppTap: EventEmitter<MouseEvent> = new EventEmitter();

  touchHasEnded: boolean;
  clickDetected: boolean;
  pressTimer: number | null;

  @HostListener('touchstart', ['$event'])
  public onTouchStart(event: MouseEvent): void {
    this.touchHasEnded = false;
    this.pressTimer = window.setTimeout(() => {
      this.pressTimer = null;

      if (!this.touchHasEnded) {
        this.ppPress.emit(event);
      }
    }, this.pressTime);
  }

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent): void {
    if (this.pressTimer) {
      clearTimeout(this.pressTimer);
      this.ppTap.emit(event);
    }
  }

  @HostListener('touchend')
  onTouchEnd() {
    this.touchHasEnded = true;
  }
}
