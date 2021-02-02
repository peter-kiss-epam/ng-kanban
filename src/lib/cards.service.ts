import { Injectable, OnDestroy } from '@angular/core';
import { ICard } from './card/ICard';
import { IColumn } from './IColumn';
import { Point } from './card/Point';
import { BehaviorSubject, interval, Observable, Subject, Subscription } from 'rxjs';
import { StorageService } from './storage.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardsService implements OnDestroy {
  private mCards: ICard[] = [];
  private mColumns: IColumn[] = [
    {
      name: 'capture',
      title: 'Capture',
    },
    {
      name: 'doing',
      title: 'Doing'
    },
    {
      name: 'today',
      title: 'Today'
    },
    {
      name: 'this-week',
      title: 'This week'
    },
    {
      name: 'next-week',
      title: 'Next week'
    },
    {
      name: 'done',
      title: 'Done'
    }
  ];


  private $moves: Subject<Point>;
  private $changes = new BehaviorSubject(false);

  private eventListeners: MouseEvent[] = [];
  private subs = new Subscription();
  private dragging = false;

  constructor(protected db: StorageService) {
    this.$moves = this.resetMoves();

    window.addEventListener('mousemove',
      (ev: MouseEvent) => {
        this.$moves.next({x: ev.pageX, y: ev.pageY});
      });
    window.addEventListener('mouseup',
      (ev: MouseEvent) => {
        const poi = {x: ev.pageX, y: ev.pageY};
        this.$moves.next(poi);
        this.$moves.complete();

        this.$moves = this.resetMoves();
      });

    this.persist();
  }

  ngOnDestroy(): void {
  }

  private resetMoves(): Subject<Point> {
    this.dragging = false;
    return new Subject<Point>();
  }

  private persist(): void {
    this.mCards = this.db.cards;
    interval(1000).subscribe(() => {
      if (!this.dragging) {
        this.mCards = this.db.cards;
        this.$changes.next(false);
      }
    });
    this.$changes.subscribe(shouldSave => {
      if (shouldSave) {
        this.db.cards = this.mCards;
      }
    });
  }

  public get changes$(): Observable<boolean> {
    return this.$changes.asObservable();
  }

  public get cards(): ICard[] {
    return this.mCards;
  }

  public get columns(): IColumn[] {
    return this.mColumns;
  }

  public addCard(card: ICard): void {
    this.mCards.push(card);
    this.$changes.next(true);
  }

  filter(column: string): ICard[] {
    return this.cards.filter(c => c.column === column);
  }

  setColumnRect(index: number, rect: ClientRect): void {
    this.columns[index].rect = rect;
  }

  private contains(rect: ClientRect, poi: Point): boolean {
    return rect.top < poi.y && rect.bottom > poi.y &&
      rect.left < poi.x && rect.right > poi.x;
  }

  moveCard(card: ICard, poi: Point): void {
    for (const col of this.columns) {
      const rect = col.rect || new ClientRect();
      if (this.contains(rect, poi)) {
        card.column = col.name;
        this.$changes.next(true);
        return;
      }
    }
  }

  moves$(): Observable<Point> {
    return this.$moves.asObservable().pipe(
      tap(() => {
        this.dragging = true;
      })
    );
  }

  clearColumn(column: string): void {
    this.mCards = this.mCards.filter(card => card.column !== column);
    this.$changes.next(true);
  }
}
