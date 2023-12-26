import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasCcComponent } from './estadisticas-cc.component';

describe('EstadisticasCcComponent', () => {
  let component: EstadisticasCcComponent;
  let fixture: ComponentFixture<EstadisticasCcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisticasCcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadisticasCcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
