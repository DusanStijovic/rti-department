import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledajSpiskoveComponent } from './pregledaj-spiskove.component';

describe('PregledajSpiskoveComponent', () => {
  let component: PregledajSpiskoveComponent;
  let fixture: ComponentFixture<PregledajSpiskoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledajSpiskoveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PregledajSpiskoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
