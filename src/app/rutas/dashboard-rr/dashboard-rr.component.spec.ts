import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRRComponent } from './dashboard-rr.component';

describe('DashboardRRComponent', () => {
  let component: DashboardRRComponent;
  let fixture: ComponentFixture<DashboardRRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardRRComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardRRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
