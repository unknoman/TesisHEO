import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioTCComponent } from './servicio-tc.component';

describe('ServicioTCComponent', () => {
  let component: ServicioTCComponent;
  let fixture: ComponentFixture<ServicioTCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicioTCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicioTCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
