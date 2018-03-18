import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

import { environment } from './../../environments/environment';
import { Car } from './../core/model';

export class CarFilter {
  page = 0;
  itemsPerPage = 5;
}

@Injectable()
export class CarService {

  carsUrl: string;

  constructor(private http: Http) {
    this.carsUrl = `${environment.apiUrl}/cars`;
  }

  search(filter: CarFilter): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filter.page.toString());
    params.set('size', filter.itemsPerPage.toString());

    return this.http.get(`${this.carsUrl}`, { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const cars = responseJson.content;

        const result = {
          cars,
          total: responseJson.totalElements
        };

        return result;
      })
  }

  listAll(): Promise<any> {
    return this.http.get(this.carsUrl)
      .toPromise()
      .then(response => response.json().content);
  }

  delete(cod: number): Promise<void> {
    return this.http.delete(`${this.carsUrl}/${cod}`)
      .toPromise()
      .then(() => null);
  }

  add(car: Car): Promise<Car> {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');

    return this.http.post(this.carsUrl, JSON.stringify(car), { headers })
      .toPromise()
      .then(response => response.json());
  }

  update(car: Car): Promise<Car> {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.carsUrl}/${car.cod}`,
        JSON.stringify(car), { headers })
      .toPromise()
      .then(response => response.json() as Car);
  }

  searchByCode(cod: number): Promise<Car> {
    return this.http.get(`${this.carsUrl}/${cod}`)
      .toPromise()
      .then(response => {
        const car = response.json() as Car;

        this.convertStringToDate([car]);

        return car;
      });
  }

  changeStatus(cod: number, newCar: boolean): Promise<void> {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.carsUrl}/${cod}/newcar`, newCar, { headers })
      .toPromise()
      .then(() => null);
  }

  private convertStringToDate(cars: Car[]) {
    for (const car of cars) {
      car.creationDate = moment(car.creationDate,
        'YYYY-MM-DD').toDate();

      if (car.updateDate) {
        car.updateDate = moment(car.updateDate,
          'YYYY-MM-DD').toDate();
      }
    }
  }
}
