import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardARComponent } from './dashboard-ar.component';

describe('DashboardARComponent', () => {
  let component: DashboardARComponent;
  let fixture: ComponentFixture<DashboardARComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardARComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardARComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
