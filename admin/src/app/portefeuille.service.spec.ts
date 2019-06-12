import { TestBed, inject } from '@angular/core/testing';

import { PortefeuilleService } from './portefeuille.service';

describe('PortefeuilleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PortefeuilleService]
    });
  });

  it('should be created', inject([PortefeuilleService], (service: PortefeuilleService) => {
    expect(service).toBeTruthy();
  }));
});
