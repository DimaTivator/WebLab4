import { TestBed } from '@angular/core/testing';

import { ShotsService } from './shots.service';

describe('ShotsService', () => {
  let service: ShotsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShotsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
