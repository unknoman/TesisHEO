import { TestBed } from '@angular/core/testing';

import { FormatdatesService } from './formatdates.service';

describe('FormatdatesService', () => {
  let service: FormatdatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatdatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
