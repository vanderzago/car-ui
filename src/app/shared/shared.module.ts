import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MessageComponent
  ],
  exports: [
    MessageComponent
  ]
})
export class SharedModule { }
