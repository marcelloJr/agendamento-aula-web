import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormCompoment } from './form/form.component';
import { ScheduleComponent } from './schedule.component';

const routes: Routes = [
  {
    path: '',
    component: ScheduleComponent,
    children: [
      {
        path: '',
        component: ListComponent
      },
      {
        path: 'cadastrar',
        component: FormCompoment
      },
      {
        path: ':id/editar',
        component: FormCompoment
      },
      {
        path: ':id/visualizar',
        component: FormCompoment
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
