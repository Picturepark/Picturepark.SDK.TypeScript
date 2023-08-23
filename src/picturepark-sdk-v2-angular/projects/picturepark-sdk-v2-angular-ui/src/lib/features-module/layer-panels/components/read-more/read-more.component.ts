import { Component, Input, ElementRef, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslatePipe } from '../../../../shared-module/pipes/translate.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pp-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TranslatePipe],
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
    if (currentHeight > this.maxHeight) {
      this.isCollapsed$.next(true);
      this.isCollapsable$.next(true);
    }
  }

  toggle() {
    this.isCollapsed$.next(!this.isCollapsed$.value);
  }
}
