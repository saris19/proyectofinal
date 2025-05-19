import { TestBed } from '@angular/core/testing';

import { VehicleDetectorFactoryService } from './vehicle-detector-factory.service';

describe('VehicleDetectorFactoryService', () => {
  let service: VehicleDetectorFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleDetectorFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
