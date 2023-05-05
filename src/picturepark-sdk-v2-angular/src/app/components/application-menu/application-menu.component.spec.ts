import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';

import { ApplicationMenuComponent } from './application-menu.component';

describe('ApplicationMenuComponent', () => {
  let component: ApplicationMenuComponent;
  let fixture: ComponentFixture<ApplicationMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, MatSlideToggleModule, MatTooltipModule, RouterTestingModule],
      declarations: [ApplicationMenuComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
