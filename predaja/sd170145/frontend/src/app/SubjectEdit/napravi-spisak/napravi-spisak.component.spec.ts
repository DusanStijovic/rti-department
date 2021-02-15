import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NapraviSpisakComponent } from './napravi-spisak.component';

describe('NapraviSpisakComponent', () => {
  let component: NapraviSpisakComponent;
  let fixture: ComponentFixture<NapraviSpisakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NapraviSpisakComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NapraviSpisakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
