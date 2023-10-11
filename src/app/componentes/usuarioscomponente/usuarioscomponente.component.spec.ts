import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioscomponenteComponent } from './usuarioscomponente.component';

describe('UsuarioscomponenteComponent', () => {
  let component: UsuarioscomponenteComponent;
  let fixture: ComponentFixture<UsuarioscomponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioscomponenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioscomponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
