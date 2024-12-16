import { TestBed } from '@angular/core/testing';

import { MostrarRamosService } from './mostrar-ramos.service';

describe('MostrarRamosService', () => {
  let service: MostrarRamosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MostrarRamosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
