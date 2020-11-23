import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationMenuComponent } from './application-menu.component';
import { ApplicationMenuModule } from './application-menu.module';

describe('ApplicationMenuComponent', () => {
  let component: ApplicationMenuComponent;
  let fixture: ComponentFixture<ApplicationMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ApplicationMenuModule],
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
