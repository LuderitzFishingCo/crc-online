import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardReportComponent } from './leaderboard-report.component';

describe('LeaderboardReportComponent', () => {
  let component: LeaderboardReportComponent;
  let fixture: ComponentFixture<LeaderboardReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaderboardReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
