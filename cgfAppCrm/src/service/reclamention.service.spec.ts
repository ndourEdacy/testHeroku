import { TestBed, inject } from '@angular/core/testing';

import { ReclamentionService } from './reclamention.service';

describe('ReclamentionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReclamentionService]
    });
  });

  it('should be created', inject([ReclamentionService], (service: ReclamentionService) => {
    expect(service).toBeTruthy();
  }));
});
