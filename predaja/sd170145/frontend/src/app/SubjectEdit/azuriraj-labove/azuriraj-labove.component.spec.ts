import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzurirajLaboveComponent } from './azuriraj-labove.component';

describe('AzurirajLaboveComponent', () => {
  let component: AzurirajLaboveComponent;
  let fixture: ComponentFixture<AzurirajLaboveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzurirajLaboveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AzurirajLaboveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
