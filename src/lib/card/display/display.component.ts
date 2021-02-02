import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild
} from '@angular/core';
import { ICard } from '../ICard';
import { CardsService } from '../../cards.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-card-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayComponent implements AfterViewInit {

  @Input()
  card!: ICard;

  private x = 0;
  private y = 0;

  constructor(private el: ElementRef,
              private cd: ChangeDetectorRef,
              private cards: CardsService) {
  }

  ngAfterViewInit(): void {
    const rect = this.el.nativeElement.getBoundingClientRect();
    this.card.rect = rect;
    this.x = rect.left;
    this.y = rect.top;
  }

  get position(): string {
    return `top: ${this.y - 10}px; left: ${this.x - 100}px`;
  }

  @HostListener('mousedown', ['$event'])
  startDragging($event: MouseEvent): void {
    this.el.nativeElement.classList.add('dragging');

    this.cards.moves$()
      .pipe(
        finalize(() => {
          this.el.nativeElement.classList.remove('dragging');
          this.cards.moveCard(this.card, {x: this.x, y: this.y});
        }))
      .subscribe(poi => {
        this.x = poi.x;
        this.y = poi.y;
        this.cd.detectChanges();
      });

    this.cd.detectChanges();
  }
}
