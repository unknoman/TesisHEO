import { TestBed } from '@angular/core/testing';

import { SweetalertutilService } from './sweetalertutil.service';

describe('SweetalertutilService', () => {
  let service: SweetalertutilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SweetalertutilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
