import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanComponent } from './kanban.component';
import { CreateComponent } from './card/create/create.component';
import { DisplayComponent } from './card/display/display.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClearComponent } from './card/clear/clear.component';


@NgModule({
  declarations: [
    KanbanComponent,
    CreateComponent,
    DisplayComponent,
    ClearComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    KanbanComponent,
  ]
})
export class KanbanModule {
}
