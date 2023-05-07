import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesrComponent } from './planesr.component';

describe('PlanesrComponent', () => {
  let component: PlanesrComponent;
  let fixture: ComponentFixture<PlanesrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanesrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanesrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
