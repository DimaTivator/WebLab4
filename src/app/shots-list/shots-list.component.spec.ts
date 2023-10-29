import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShotsListComponent } from './shots-list.component';

describe('ShotsListComponent', () => {
  let component: ShotsListComponent;
  let fixture: ComponentFixture<ShotsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShotsListComponent]
    });
    fixture = TestBed.createComponent(ShotsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
