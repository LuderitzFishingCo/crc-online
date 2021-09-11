import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubComponentsComponent } from './sub-components.component';

describe('SubComponentsComponent', () => {
  let component: SubComponentsComponent;
  let fixture: ComponentFixture<SubComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
