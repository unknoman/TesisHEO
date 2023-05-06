import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SociosTablaComponent } from './socios-tabla.component';

describe('SociosTablaComponent', () => {
  let component: SociosTablaComponent;
  let fixture: ComponentFixture<SociosTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SociosTablaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SociosTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
