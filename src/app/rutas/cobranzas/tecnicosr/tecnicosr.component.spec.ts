import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicosrComponent } from './tecnicosr.component';

describe('TecnicosrComponent', () => {
  let component: TecnicosrComponent;
  let fixture: ComponentFixture<TecnicosrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TecnicosrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TecnicosrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
