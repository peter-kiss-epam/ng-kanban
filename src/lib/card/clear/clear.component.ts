import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../cards.service';

@Component({
  selector: 'app-clear-cards',
  templateUrl: './clear.component.html',
  styleUrls: ['./clear.component.scss']
})
export class ClearComponent implements OnInit {

  constructor(private cards: CardsService) { }

  ngOnInit(): void {
  }

  clearCards(column: string): void {
    this.cards.clearColumn(column);
  }
}
