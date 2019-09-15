import { TestBed } from '@angular/core/testing';

import { VecinoNuevoService } from './vecino-nuevo.service';

describe('VecinoNuevoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VecinoNuevoService = TestBed.get(VecinoNuevoService);
    expect(service).toBeTruthy();
  });
});
