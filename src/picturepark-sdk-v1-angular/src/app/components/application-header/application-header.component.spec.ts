import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationHeaderComponent } from './application-header.component';
import { ApplicationHeaderModule } from './application-header.module';

describe('ApplicationHeaderComponent', () => {
  let component: ApplicationHeaderComponent;
  let fixture: ComponentFixture<ApplicationHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ApplicationHeaderModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
