import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzurirajPredmetComponent } from './azuriraj-predmet.component';

describe('AzurirajPredmetComponent', () => {
  let component: AzurirajPredmetComponent;
  let fixture: ComponentFixture<AzurirajPredmetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzurirajPredmetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AzurirajPredmetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
