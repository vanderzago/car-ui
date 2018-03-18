import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';
import * as moment from 'moment';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { Car } from './../../core/model';
import { CarService } from './../car.service';

@Component({
  selector: 'app-car-input',
  templateUrl: './car-input.component.html',
  styleUrls: ['./car-input.component.css']
})

export class CarInputComponent implements OnInit {

  car = new Car();

  constructor(
    private carService: CarService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const carCode = this.route.snapshot.params['cod'];

    this.title.setTitle('Novo Carro');

    if (carCode) {
      this.loadCar(carCode);
    }
  }

  get editing() {
    return Boolean(this.car.cod)
  }

  loadCar(cod: number) {
    this.carService.searchByCode(cod)
      .then(car => {
        this.car = car;
        this.updateTitle();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  saveCar(form: FormControl) {
    if (this.editing) {
      this.updateCar(form);
    } else {
      this.addCar(form);
    }
  }

  addCar(form: FormControl) {
    this.car.creationDate = new Date();
    this.carService.add(this.car)
      .then(carAdded => {
        this.toasty.success('Carro adicionado com sucesso!');

        this.router.navigate(['/cars-ui', carAdded.cod]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  updateCar(form: FormControl) {
    this.car.updateDate = new Date()
    this.carService.update(this.car)
      .then(car => {
        this.car = car;

        this.toasty.success('Carro alterado com sucesso!');
        this.updateTitle();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  newForm(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.car = new Car();
    }.bind(this), 1);

    this.router.navigate(['/cars-ui/new']);
  }

  updateTitle() {
    this.title.setTitle(`Edição de carros: ${this.car.brand}`);
  }

}
