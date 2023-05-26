import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ApplicationMenuComponent } from './application-menu.component';

describe('ApplicationMenuComponent', () => {
  let component: ApplicationMenuComponent;
  let fixture: ComponentFixture<ApplicationMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [CommonModule, MatSlideToggleModule, MatTooltipModule, RouterTestingModule, ApplicationMenuComponent],
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
