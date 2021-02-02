import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CardsService } from '../../cards.service';
import { DEFAULT_COLUMN } from '../ICard';

@Component({
  selector: 'app-card-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {

  @Input()
  targetColumnName: string = DEFAULT_COLUMN;

  content = new FormControl();

  constructor(public cs: CardsService) {
  }

  keyDown($event: KeyboardEvent): void {
    if ($event.key === 'Enter') {
      this.cs.addCard({
        column: this.targetColumnName,
        content: this.content.value
      });
      this.content.setValue('');
    }
  }
}
