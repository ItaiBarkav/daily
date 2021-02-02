import { TestBed } from '@angular/core/testing';

import { TeamScheduleStoreService } from './team-schedule-store.service';

describe('TeamScheduleStoreService', () => {
  let service: TeamScheduleStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamScheduleStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
