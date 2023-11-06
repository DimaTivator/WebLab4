import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationFormComponent } from './authorization-form.component';

describe('AuthorizationFormComponent', () => {
  let component: AuthorizationFormComponent;
  let fixture: ComponentFixture<AuthorizationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorizationFormComponent]
    });
    fixture = TestBed.createComponent(AuthorizationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
