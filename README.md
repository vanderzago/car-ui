# CarUi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Steps
1  npm install primeng --save
2  npm install font-awesome --save
3  npm install moment --save
4  npm install ng2-toasty --save
5  npm install ng2-currency-mask --save
6  vi .angular-cli.json and included css lines for primeng, font-awesome and toasty
7  ng g m cars
8  ng g c cars/car-input
9  ng g c cars/car-search
10  ng g s cars/car
11 ng g m shared
12 ng g c shared/message --inline-template --inline-style
13 vi shared/shared.modules.ts
14 vi shared/message/message.components.ts
15 ng g m core
16 ng g c core/pagina-nao-encontrada --inline-style --inline-template --flat
17 vi core/pagina-nao-encontrada
18 ng g s core/error-handler --spec=false
19 vi core/error-handler.service.ts
20 vi core/model.ts (new)
21 vi core/core.modules.ts
22 vi app-routing.module.ts (new)
23 vi cars/car-routing.module.ts (new)
24 vi cars/car-module.ts
25 vi app.module.ts
26 vi app.component.ts
27 vi app.component.html
28 vi environments/environment.ts
29 vi environments/environment-prod.ts