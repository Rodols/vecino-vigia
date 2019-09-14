import { TestBed } from '@angular/core/testing';

import { VecinoHelpService } from './vecino-help.service';

describe('VecinoHelpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VecinoHelpService = TestBed.get(VecinoHelpService);
    expect(service).toBeTruthy();
  });
});
