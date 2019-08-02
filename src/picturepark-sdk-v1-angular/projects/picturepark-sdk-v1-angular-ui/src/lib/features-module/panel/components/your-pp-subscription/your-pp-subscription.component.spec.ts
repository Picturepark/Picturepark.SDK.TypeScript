import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourPpSubscriptionComponent } from './your-pp-subscription.component';

describe('YourPpSubscriptionComponent', () => {
  let component: YourPpSubscriptionComponent;
  let fixture: ComponentFixture<YourPpSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourPpSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourPpSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
