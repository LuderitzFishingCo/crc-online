import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListReportComponent } from './course-list-report.component';

describe('CourseListReportComponent', () => {
  let component: CourseListReportComponent;
  let fixture: ComponentFixture<CourseListReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseListReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
