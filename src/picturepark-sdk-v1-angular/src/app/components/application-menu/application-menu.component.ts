import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { StorageKey, LocalStorageService } from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'app-application-menu',
  templateUrl: './application-menu.component.html',
  styleUrls: ['./application-menu.component.scss'],
})
export class ApplicationMenuComponent implements OnInit {
  @ViewChild('labelNameElement', { static: true }) labelNameElement: ElementRef;

  labelName: string | undefined;
  isLightTheme: boolean;

  menuOptions: any[] = [
    {
      name: 'Search',
      icon: 'search',
      link: 'content-picker',
    },
    {
      name: 'Share manager',
      icon: 'share',
      link: 'share-manager',
    },
    {
      name: 'Share viewer',
      icon: 'share',
      link: 'share-viewer',
    },
    {
      name: 'Lists',
      icon: 'reorder',
      link: 'list-item-picker',
    },
    {
      name: 'Help',
      icon: 'contact_support',
      link: 'help',
    },
  ];

  // VARS
  menuState = false;
  animateLogoState = false;

  constructor(private renderer: Renderer2, private localStorageService: LocalStorageService) {}

  // ANIMATE LOGO
  animateLogo(): void {
    if (!this.menuState) {
      this.animateLogoState = true;
    } else {
      this.animateLogoState = false;
    }
  }

  // EXPAND MENU
  expandMenu(): void {
    if (this.menuState) {
      this.menuState = false;
    } else {
      this.menuState = true;
      this.animateLogoState = false;
    }
  }

  // DISPLAY LABEL ON HOVER
  showLabel(event: any, labelName: string): void {
    if (!this.menuState) {
      this.labelName = labelName;
      this.renderer.setStyle(this.labelNameElement.nativeElement, 'top', `${event.target.offsetTop + 76}px`);
      this.renderer.setStyle(this.labelNameElement.nativeElement, 'left', '70px');
    }
  }

  // HIDE LABEL
  hideLabel(): void {
    this.labelName = undefined;
  }

  onThemeChange() {
    this.isLightTheme = !this.isLightTheme;
    this.localStorageService.set(StorageKey.IsLightTheme, `${this.isLightTheme}`);
    this.applyTheme();
  }

  private applyTheme() {
    if (this.isLightTheme) {
      document.body.classList.remove('dark-theme');
    } else {
      document.body.classList.add('dark-theme');
    }
  }

  ngOnInit() {
    this.isLightTheme = this.localStorageService.get(StorageKey.IsLightTheme) === 'true';
    this.applyTheme();
  }
}
