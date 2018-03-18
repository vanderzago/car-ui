import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { ToastyService } from 'ng2-toasty';

@Injectable()
export class ErrorHandlerService {

  constructor(
    private toasty: ToastyService,
    private router: Router
  ) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    } else if (errorResponse instanceof Response
        && errorResponse.status >= 400 && errorResponse.status <= 499) {
      let errors;
      msg = 'Um erro ocorreu ao processar sua requisição.';

      if (errorResponse.status === 403) {
        msg = 'Você não tem permissão para realizar essa ação.';
      }

      try {
        errors = errorResponse.json();

        msg = errors[0].mensagemUsuario;
      } catch (e) { }

      console.error('Um erro ocorreu', errorResponse);

    } else {
      msg = 'Um erro ocorreu ao processar o serviço remoto. Por favor, tente novamente';
      console.error('Um erro ocorreu', errorResponse);
    }

    this.toasty.error(msg);
  }

}
