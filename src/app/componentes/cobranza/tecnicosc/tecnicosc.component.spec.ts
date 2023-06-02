import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicoscComponent } from './tecnicosc.component';

describe('TecnicoscComponent', () => {
  let component: TecnicoscComponent;
  let fixture: ComponentFixture<TecnicoscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TecnicoscComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TecnicoscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
