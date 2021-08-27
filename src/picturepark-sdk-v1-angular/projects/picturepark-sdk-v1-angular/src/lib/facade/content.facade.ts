import { Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class ContentFacade {
  constructor(private sanitizer: DomSanitizer) {}

  getVirtualItemHtml(displayValue: string) {
    if (displayValue.includes('<cp-thumbnail-content')) {
      displayValue = `<cp-thumbnail-content>${displayValue}</cp-thumbnail-content>`;
    }

    displayValue = this.removeOverlayElements(displayValue);

    return this.sanitizer.sanitize(SecurityContext.HTML, displayValue);
  }

  removeOverlayElements(displayValue: string) {
    const elements = ['cp-overlay-box-bottom-left', 'cp-overlay-box-bottom-right', 'cp-overlay-box-top-left'];
    elements.forEach((element) => {
      if (displayValue.includes(`<${element}`)) {
        displayValue = this.removeElement(displayValue, element);
      }
    });

    displayValue = this.removeElement(displayValue, '.virtual-content-footer');

    return displayValue;
  }

  removeElement(displayValue: string, selector: string) {
    const element = this.getElements(displayValue, selector)[0];
    if (element) {
      displayValue = displayValue.replace(element.outerHTML, '');
    }

    return displayValue;
  }

  private getElements(html: string, selector: string) {
    const parser = new DOMParser();
    const dom = parser.parseFromString(html, 'text/html');
    const elems = dom.querySelectorAll(selector);
    return Array.prototype.map.call(elems, (e: Element) => e) as Element[];
  }
}
