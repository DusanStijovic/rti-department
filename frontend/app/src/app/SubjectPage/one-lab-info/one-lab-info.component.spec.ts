import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneLabInfoComponent } from './one-lab-info.component';

describe('OneLabInfoComponent', () => {
  let component: OneLabInfoComponent;
  let fixture: ComponentFixture<OneLabInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneLabInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneLabInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
