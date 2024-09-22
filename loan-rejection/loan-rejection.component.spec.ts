import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRejectionComponent } from './loan-rejection.component';

describe('LoanRejectionComponent', () => {
  let component: LoanRejectionComponent;
  let fixture: ComponentFixture<LoanRejectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanRejectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanRejectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
