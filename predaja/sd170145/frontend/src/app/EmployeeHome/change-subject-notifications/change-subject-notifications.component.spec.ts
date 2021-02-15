import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeSubjectNotificationsComponent } from './change-subject-notifications.component';

describe('ChangeSubjectNotificationsComponent', () => {
  let component: ChangeSubjectNotificationsComponent;
  let fixture: ComponentFixture<ChangeSubjectNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeSubjectNotificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeSubjectNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
