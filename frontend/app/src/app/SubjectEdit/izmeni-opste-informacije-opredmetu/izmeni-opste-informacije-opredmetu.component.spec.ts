import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzmeniOpsteInformacijeOPredmetuComponent } from './izmeni-opste-informacije-opredmetu.component';

describe('IzmeniOpsteInformacijeOPredmetuComponent', () => {
  let component: IzmeniOpsteInformacijeOPredmetuComponent;
  let fixture: ComponentFixture<IzmeniOpsteInformacijeOPredmetuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IzmeniOpsteInformacijeOPredmetuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IzmeniOpsteInformacijeOPredmetuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
