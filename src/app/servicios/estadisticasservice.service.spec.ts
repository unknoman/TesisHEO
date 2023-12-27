import { TestBed } from '@angular/core/testing';

import { EstadisticasserviceService } from './estadisticasservice.service';

describe('EstadisticasserviceService', () => {
  let service: EstadisticasserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadisticasserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
