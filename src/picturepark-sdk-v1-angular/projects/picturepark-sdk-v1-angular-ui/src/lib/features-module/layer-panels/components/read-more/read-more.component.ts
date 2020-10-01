import { Component, Input, ElementRef, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'pp-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadMoreComponent implements AfterViewInit {
  @Input() maxHeight = 100;

  isCollapsed$ = new BehaviorSubject(false);
  isCollapsable$ = new BehaviorSubject(false);

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    setTimeout(() => this.update());
  }

  update() {
    const currentHeight = this.elementRef.nativeElement.getElementsByTagName('div')[0].offsetHeight;
    console.log(this.elementRef.nativeElement.getElementsByTagName('div')[0]);
    console.log(currentHeight);
    console.log(this.maxHeight);
    if (currentHeight > this.maxHeight) {
      this.isCollapsed$.next(true);
      this.isCollapsable$.next(true);
    }
  }

  toggle() {
    this.isCollapsed$.next(!this.isCollapsed$.value);
  }
}
