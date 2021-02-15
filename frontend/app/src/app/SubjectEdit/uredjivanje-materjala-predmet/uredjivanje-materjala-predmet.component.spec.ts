import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UredjivanjeMaterjalaPredmetComponent } from './uredjivanje-materjala-predmet.component';

describe('UredjivanjeMaterjalaPredmetComponent', () => {
  let component: UredjivanjeMaterjalaPredmetComponent;
  let fixture: ComponentFixture<UredjivanjeMaterjalaPredmetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UredjivanjeMaterjalaPredmetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UredjivanjeMaterjalaPredmetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
