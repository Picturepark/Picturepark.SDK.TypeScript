import { ElementRef, Renderer2, Directive, OnInit, Input } from '@angular/core';
import markdown from 'markdown-it';

@Directive({
  selector: '[ppMarkdown]',
})
export class MarkdownDirective implements OnInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @Input() markdownText: string;

  ngOnInit() {
    if (this.markdownText && this.markdownText.length > 0) {
      const md = new markdown();
      this.overrideLinkOpenRule(md.renderer.rules);
      const markdownHtml = md.render(this.markdownText);
      this.renderer.setProperty(this.elementRef.nativeElement, 'innerHTML', markdownHtml);
    }
  }

  overrideLinkOpenRule(rules: any) {
    const defaultRender =
      rules.link_open ||
      function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
      };

    rules.link_open = function (tokens, idx, options, env, self) {
      const aIndex = tokens[idx].attrIndex('target');

      if (aIndex < 0) {
        tokens[idx].attrPush(['target', '_blank']);
      } else {
        tokens[idx].attrs[aIndex][1] = '_blank';
      }
      return defaultRender(tokens, idx, options, env, self);
    };
  }
}
