import { TestBed } from '@angular/core/testing';

import { ShowImageService } from './show-image.service';

describe('ShowImageService', () => {
  let service: ShowImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
