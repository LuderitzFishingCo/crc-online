import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersJoiningReportComponent } from './members-joining-report.component';

describe('MembersJoiningReportComponent', () => {
  let component: MembersJoiningReportComponent;
  let fixture: ComponentFixture<MembersJoiningReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersJoiningReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersJoiningReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
