import { TestBed } from '@angular/core/testing';

import { FilterserviceService } from './filterservice.service';

describe('FilterserviceService', () => {
  let service: FilterserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
