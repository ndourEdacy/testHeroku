import { TestBed, inject } from '@angular/core/testing';

import { PhonningServiceService } from './phonning-service.service';

describe('PhonningServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhonningServiceService]
    });
  });

  it('should be created', inject([PhonningServiceService], (service: PhonningServiceService) => {
    expect(service).toBeTruthy();
  }));
});
