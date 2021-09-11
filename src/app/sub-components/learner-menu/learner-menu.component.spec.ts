import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerMenuComponent } from './learner-menu.component';

describe('LearnerMenuComponent', () => {
  let component: LearnerMenuComponent;
  let fixture: ComponentFixture<LearnerMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnerMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
