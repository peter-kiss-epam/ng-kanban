import { Injectable } from '@angular/core';
import { ICard } from './card/ICard';

const KEY = 'kanban-cards';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  get cards(): ICard[] {
    const cardsStr = window.localStorage.getItem(KEY);
    if (cardsStr) {
      return JSON.parse(cardsStr);
    }
    return [];
  }

  set cards(cs: ICard[]) {
    window.localStorage.setItem(KEY, JSON.stringify(cs));
  }
}
