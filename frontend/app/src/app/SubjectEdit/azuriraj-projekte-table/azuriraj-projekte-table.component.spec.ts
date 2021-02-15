import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzurirajProjekteTableComponent } from './azuriraj-projekte-table.component';

describe('AzurirajProjekteTableComponent', () => {
  let component: AzurirajProjekteTableComponent;
  let fixture: ComponentFixture<AzurirajProjekteTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzurirajProjekteTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AzurirajProjekteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
