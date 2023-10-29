import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePageComponent } from './time-page.component';

describe('TimePageComponent', () => {
  let component: TimePageComponent;
  let fixture: ComponentFixture<TimePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimePageComponent]
    });
    fixture = TestBed.createComponent(TimePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
