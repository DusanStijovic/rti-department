import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzurirajLaboveTableComponent } from './azuriraj-labove-table.component';

describe('AzurirajLaboveTableComponent', () => {
  let component: AzurirajLaboveTableComponent;
  let fixture: ComponentFixture<AzurirajLaboveTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzurirajLaboveTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AzurirajLaboveTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
