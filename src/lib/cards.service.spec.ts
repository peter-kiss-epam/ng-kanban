import { TestBed } from '@angular/core/testing';

import { CardsService } from './cards.service';
import { StorageService } from './storage.service';

describe('CardsService', () => {
  let service: CardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: StorageService,
          useValue: {
            cards: []
          }
        }
      ],
    });
    service = TestBed.inject(CardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addCard', () => {
    it('should add a Card', () => {
      // GIVEN
      expect(service.cards.length).toBe(0);
      // WHEN
      service.addCard({column: 'test', content: 'test'});
      expect(service.cards.length).toBe(1);
    });
  });

  describe('filter', () => {
    it('should return a card for the column', () => {
      // GIVEN
      service.addCard({column: 'test', content: 'test'});
      // WHEN
      const cards = service.filter('test');
      // THEN
      expect(cards.length).toBe(1);
    });
    it('should not return other columns cards', () => {
      service.addCard({column: 'test', content: 'test'});
      // WHEN
      const cards = service.filter('no-test');
      // THEN
      expect(cards.length).toBe(0);

    });
    it('should always return an array', () => {
      // WHEN
      const cards = service.filter('rest');
      // THEN
      expect(Array.isArray(cards)).toBeTruthy();
      expect(cards.length).toBe(0);
    });
  });

  describe('columns', () => {
    it('should give back 6 columns', () => {
      expect(service.columns.length).toBe(6);
    });
  });
});
