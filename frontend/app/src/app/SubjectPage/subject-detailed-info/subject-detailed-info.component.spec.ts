import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectDetailedInfoComponent } from './subject-detailed-info.component';

describe('SubjectDetailedInfoComponent', () => {
  let component: SubjectDetailedInfoComponent;
  let fixture: ComponentFixture<SubjectDetailedInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectDetailedInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectDetailedInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
