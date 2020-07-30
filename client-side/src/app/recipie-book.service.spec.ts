import { TestBed } from '@angular/core/testing';

import { RecipieBookService } from './recipie-book.service';

describe('RecipieBookService', () => {
  let service: RecipieBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipieBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
