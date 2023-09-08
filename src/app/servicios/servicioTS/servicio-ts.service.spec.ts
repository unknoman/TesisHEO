import { TestBed } from '@angular/core/testing';

import { ServicioTSService } from './servicio-ts.service';

describe('ServicioTSService', () => {
  let service: ServicioTSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioTSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
