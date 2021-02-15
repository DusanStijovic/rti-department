import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledSpiskaComponent } from './pregled-spiska.component';

describe('PregledSpiskaComponent', () => {
  let component: PregledSpiskaComponent;
  let fixture: ComponentFixture<PregledSpiskaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledSpiskaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PregledSpiskaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
