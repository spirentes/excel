import { TestBed } from '@angular/core/testing';

import { ListUsersService } from './users-list.service';

describe('ListUsersService', () => {
  let service: ListUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
