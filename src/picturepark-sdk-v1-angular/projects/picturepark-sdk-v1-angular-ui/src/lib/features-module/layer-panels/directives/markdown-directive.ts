import { ElementRef, Renderer2, Directive, OnInit, Input } from '@angular/core';
import * as markdown from 'markdown-it';

@Directive({
  selector: '[ppMarkdown]',
})
export class MarkdownDirective implements OnInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @Input() markdownText: string;

  ngOnInit() {
    if (this.markdownText && this.markdownText.length > 0) {
      const md = new markdown();
      const markdownHtml = md.render(this.markdownText);
      this.renderer.setProperty(this.elementRef.nativeElement, 'innerHTML', markdownHtml);
    }
  }
}
