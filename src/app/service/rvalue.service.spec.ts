import { TestBed } from '@angular/core/testing';

import { RValueService } from './rvalue.service';

describe('RValueService', () => {
  let service: RValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
