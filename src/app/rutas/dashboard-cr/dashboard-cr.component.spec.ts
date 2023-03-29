import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCRComponent } from './dashboard-cr.component';

describe('DashboardCRComponent', () => {
  let component: DashboardCRComponent;
  let fixture: ComponentFixture<DashboardCRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCRComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
