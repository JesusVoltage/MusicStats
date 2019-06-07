import { TestBed, inject } from '@angular/core/testing';

import { HttpRouterService } from './http-router.service';

describe('HttpRouterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpRouterService]
    });
  });

  it('should be created', inject([HttpRouterService], (service: HttpRouterService) => {
    expect(service).toBeTruthy();
  }));
});
