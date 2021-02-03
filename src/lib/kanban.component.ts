import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import { CardsService } from './cards.service';
import { Subscription } from 'rxjs';
import { IColumn } from './IColumn';
import { ICard } from './card/ICard';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KanbanComponent implements AfterViewInit, OnInit, OnDestroy, AfterViewChecked {

  @ViewChildren('column')
  columns!: QueryList<ElementRef>;

  private subs: Subscription = new Subscription();

  constructor(public cards: CardsService, private cd: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.subs.add(
      this.cards.changes$.subscribe(() => this.cd.detectChanges()));
  }

  ngAfterViewChecked(): void {
    this.columns.forEach((el, i) => {
      const rect = el.nativeElement.getBoundingClientRect();
      this.cards.setColumnRect(i, rect);
    });
  }

  trackByColumnsFn(index: number, item: IColumn): string {
    return item.name;
  }

  trackByCardsFn(index: number, item: ICard): string {
    return item.column + item.content;
  }
}
