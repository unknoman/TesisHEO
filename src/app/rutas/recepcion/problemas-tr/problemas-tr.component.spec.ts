import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemasTrComponent } from './problemas-tr.component';

describe('ProblemasTrComponent', () => {
  let component: ProblemasTrComponent;
  let fixture: ComponentFixture<ProblemasTrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProblemasTrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemasTrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
