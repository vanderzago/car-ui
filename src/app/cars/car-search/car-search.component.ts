import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { CarFilter, CarService } from './../car.service';

@Component({
  selector: 'app-car-search',
  templateUrl: './car-search.component.html',
  styleUrls: ['./car-search.component.css']
})
export class CarSearchComponent implements OnInit {

  totalRegisters = 0;
  filter = new CarFilter();
  cars = [];
  @ViewChild('tabela') grid;

  constructor(
    private carService: CarService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private toasty: ToastyService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Carros');
  }

  search(page = 0) {
    this.filter.page = page;

    this.carService.search(this.filter)
      .then(result => {
        this.totalRegisters = result.total;
        this.cars = result.cars;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  onChangePage(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.search(page);
  }

  confirmExclusion(car: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.delete(car);
      }
    });
  }

  delete(car: any) {
    this.carService.delete(car.cod)
      .then(() => {
        if (this.grid.first === 0) {
          this.search();
        } else {
          this.grid.first = 0;
        }

        this.toasty.success('Carro excluído com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  changeStatus(car: any): void {
    const newStatus = !car.newCar;

    this.carService.changeStatus(car.cod, newStatus)
      .then(() => {
        car.newCar = newStatus;
        this.toasty.success(`Status do Carro modificado com sucesso!`);
        car.updateDate = new Date()
        this.carService.update(car)
          .then(()=>{})
          .catch(erro => this.errorHandler.handle(erro));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
