import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CarInputComponent } from './car-input/car-input.component';
import { CarSearchComponent } from './car-search/car-search.component';

const routes: Routes = [
  {
    path: 'cars-ui',
    component: CarSearchComponent
  },
  {
    path: 'cars-ui/new',
    component: CarInputComponent
  },
  {
    path: 'cars-ui/:cod',
    component: CarInputComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CarRoutingModule { }
