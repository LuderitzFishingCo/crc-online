import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMarksReportComponent } from './course-marks-report.component';

describe('CourseMarksReportComponent', () => {
  let component: CourseMarksReportComponent;
  let fixture: ComponentFixture<CourseMarksReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseMarksReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseMarksReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
