import { TestBed } from '@angular/core/testing';

import { GustoMusicalService } from './gusto-musical.service';

describe('GustoMusicalService', () => {
  let service: GustoMusicalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GustoMusicalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
