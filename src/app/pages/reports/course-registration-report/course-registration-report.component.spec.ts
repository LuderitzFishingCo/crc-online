import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseRegistrationReportComponent } from './course-registration-report.component';

describe('CourseRegistrationReportComponent', () => {
  let component: CourseRegistrationReportComponent;
  let fixture: ComponentFixture<CourseRegistrationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseRegistrationReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseRegistrationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
