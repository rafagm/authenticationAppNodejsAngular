import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationErrorDialogComponent } from './authentication-error-dialog.component';

describe('AuthenticationErrorDialogComponent', () => {
  let component: AuthenticationErrorDialogComponent;
  let fixture: ComponentFixture<AuthenticationErrorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticationErrorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
