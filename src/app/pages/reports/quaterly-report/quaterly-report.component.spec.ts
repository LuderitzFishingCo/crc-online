import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuaterlyReportComponent } from './quaterly-report.component';

describe('QuaterlyReportComponent', () => {
  let component: QuaterlyReportComponent;
  let fixture: ComponentFixture<QuaterlyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuaterlyReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuaterlyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
