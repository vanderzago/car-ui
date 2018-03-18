import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';

import { CarRoutingModule } from './car-routing.module';
import { SharedModule } from './../shared/shared.module';
import { CarInputComponent } from './car-input/car-input.component';
import { CarSearchComponent } from './car-search/car-search.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    DataTableModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    TooltipModule,
    CurrencyMaskModule,
    InputMaskModule,

    SharedModule,
    CarRoutingModule
  ],
  declarations: [CarInputComponent, CarSearchComponent]
})
export class CarsModule { }
