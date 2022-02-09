import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './schedule.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListComponent } from './list/list.component';
import { FormCompoment } from './form/form.component';


@NgModule({
  declarations: [ ScheduleComponent, ListComponent, FormCompoment ],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    SharedModule
  ],
  exports: [ ScheduleComponent ]
})
export class ScheduleModule { }
