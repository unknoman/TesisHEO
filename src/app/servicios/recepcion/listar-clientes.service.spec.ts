import { TestBed } from '@angular/core/testing';

import { ListarClientesService } from './listar-clientes.service';

describe('ListarClientesService', () => {
  let service: ListarClientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListarClientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
