import { TestBed } from '@angular/core/testing';

import { DatosqrService } from './datosqr.service';

describe('DatosqrService', () => {
  let service: DatosqrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosqrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
