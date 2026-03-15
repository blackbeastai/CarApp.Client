import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlphanumericDirective } from './directives/alphanumeric.directive';
@NgModule({
  declarations: [AlphanumericDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlphanumericDirective
  ]
})
export class SharedModule { }