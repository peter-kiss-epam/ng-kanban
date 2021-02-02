import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComponent } from './create.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CardsService } from '../../cards.service';
import Spy = jasmine.Spy;

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let addCardSpy: Spy;

  beforeEach(async () => {
    addCardSpy = jasmine.createSpy('addCard');

    await TestBed.configureTestingModule({
      declarations: [CreateComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: CardsService,
          useValue: {
            addCard: addCardSpy
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('keyDown', () => {
    it('should call addCard on ENTER', () => {
      // GIVEN
      component.content.setValue('value');
      // WHEN
      component.keyDown({key: 'Enter'} as unknown as KeyboardEvent);
      // THEN
      expect(addCardSpy).toHaveBeenCalledWith({column: 'capture', content: 'value'});
    });

    it('should clear the control', () => {
      // GIVEN
      component.content.setValue('value');
      // WHEN
      component.keyDown({key: 'Enter'} as unknown as KeyboardEvent);
      // THEN
      expect(component.content.value).toEqual('');
    });
  });
});
