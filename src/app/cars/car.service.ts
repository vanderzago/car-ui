import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

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
    return this.http.post(this.carsUrl, JSON.stringify(car))
      .toPromise()
      .then(response => response.json());
  }

  update(car: Car): Promise<Car> {
    return this.http.put(`${this.carsUrl}/${car.cod}`,
        JSON.stringify(car))
      .toPromise()
      .then(response => response.json() as Car);
  }

  searchByCode(cod: number): Promise<Car> {
    return this.http.get(`${this.carsUrl}/${cod}`)
      .toPromise()
      .then(response => response.json() as Car);
  }

  changeStatus(cod: number, newCar: boolean): Promise<void> {
    return this.http.put(`${this.carsUrl}/${cod}/newcar`, newCar)
      .toPromise()
      .then(() => null);
  }
}
