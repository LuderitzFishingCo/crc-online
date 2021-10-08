import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherApplicationsReportComponent } from './teacher-applications-report.component';

describe('TeacherApplicationsReportComponent', () => {
  let component: TeacherApplicationsReportComponent;
  let fixture: ComponentFixture<TeacherApplicationsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherApplicationsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherApplicationsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
