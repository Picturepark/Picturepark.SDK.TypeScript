import { Directive, Output, EventEmitter, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[ppUserInteraction]',
})
export class UserInteractionDirective {
  // Should be more than the default device press timer (700)
  @Input() pressTime = 800;

  @Output() ppClick: EventEmitter<MouseEvent> = new EventEmitter();
  @Output() ppDblclick: EventEmitter<MouseEvent> = new EventEmitter();
  @Output() ppContextmenu: EventEmitter<MouseEvent> = new EventEmitter();

  @Output() ppTouch: EventEmitter<MouseEvent> = new EventEmitter();
  @Output() ppPress: EventEmitter<any> = new EventEmitter();

  eventQueue: (MouseEvent | TouchEvent)[] = [];
  shouldCancelSelection = false;

  pressTimer: number | null;

  resetEventQueue() {
    this.eventQueue = [];
  }

  @HostListener('mouseup')
  onMouseup() {
    this.resetEventQueue();
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    this.eventQueue.push(event);

    // If there was a touchend event then it means this is the simulated click from a touch interaction
    if (this.eventQueue.some((e) => e.type === 'touchend')) {
      this.ppTouch.emit(event);
    } else {
      this.ppClick.emit(event);
    }
  }

  @HostListener('dblclick', ['$event'])
  onDblClick(event: MouseEvent) {
    this.eventQueue.push(event);

    this.ppDblclick.emit(event);
  }

  @HostListener('touchstart', ['$event'])
  onTouchstart(event: TouchEvent) {
    this.pressTimer = window.setTimeout(() => {
      // Simulate device press event
      this.pressTimer = null;
      this.eventQueue.push(new TouchEvent('press'));
      this.ppPress.emit(event);
    }, this.pressTime);
  }

  @HostListener('touchend', ['$event'])
  onTouchend(event: TouchEvent) {
    this.eventQueue.push(event);

    if (this.pressTimer) {
      clearTimeout(this.pressTimer);
    }

    if (event.cancelable) {
      // Will stop the mousedown and click events from being executed automatically
      event.preventDefault();
    }

    // On touchend will simulate click on the target, except when it was a long press or the there has be any kind of panning
    if (!this.eventQueue.some((e) => e.type === 'press' || e.type === 'pan')) {
      (<any>event.target).click();
    }

    this.resetEventQueue();
  }

  @HostListener('touchcancel')
  onTouchcancel() {
    this.resetEventQueue();

    if (this.pressTimer) {
      clearTimeout(this.pressTimer);
    }
  }

  @HostListener('press', ['$event'])
  onPress(event: any) {
    this.eventQueue.push(event);

    if (this.pressTimer) {
      clearTimeout(this.pressTimer);
    }

    this.ppPress.emit(event);
    this.shouldCancelSelection = true;
  }

  @HostListener('contextmenu', ['$event'])
  onContextmenu(event: MouseEvent) {
    this.eventQueue.push(event);

    // On touch interaction do not show the context menu
    if (this.eventQueue.some((e) => e.type === 'press')) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      this.ppContextmenu.emit(event);
    }
  }

  @HostListener('pan', ['$event'])
  onPan(event: TouchEvent) {
    this.eventQueue.push(event);

    // This condition is needed to make sure that the pan gesture is not confused with a long press
    if (this.pressTimer) {
      clearTimeout(this.pressTimer);
    }
  }

  @HostListener('document:selectionchange')
  onSelectionchange() {
    if (this.shouldCancelSelection) {
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.empty();
    }
  }
}
