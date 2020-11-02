import { Directive, Output, EventEmitter, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[ppMobileTouch]',
})
export class MobileTouchDirective {
  @Input() pressTime = 300;
  @Output() public ppPress: EventEmitter<MouseEvent> = new EventEmitter();
  @Output() public ppClick: EventEmitter<MouseEvent> = new EventEmitter();

  isLongPress = false;
  pressTimer: NodeJS.Timeout;

  constructor() {}

  @HostListener('touchstart')
  public onMouseDown(): void {
    this.pressTimer = setTimeout(() => {
      this.isLongPress = true;
    }, this.pressTime);
  }

  @HostListener('touchend', ['$event'])
  public onMouseUp(event: MouseEvent): void {
    clearTimeout(this.pressTimer);
    if (this.isLongPress) {
      this.ppPress.emit(event);
    } else {
      this.ppClick.emit(event);
    }
    this.isLongPress = false;
  }
}
