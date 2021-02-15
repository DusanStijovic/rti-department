import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzurirajProjekteComponent } from './azuriraj-projekte.component';

describe('AzurirajProjekteComponent', () => {
  let component: AzurirajProjekteComponent;
  let fixture: ComponentFixture<AzurirajProjekteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzurirajProjekteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AzurirajProjekteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
