import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticascomComponent } from './estadisticascom.component';

describe('EstadisticascomComponent', () => {
  let component: EstadisticascomComponent;
  let fixture: ComponentFixture<EstadisticascomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisticascomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadisticascomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
