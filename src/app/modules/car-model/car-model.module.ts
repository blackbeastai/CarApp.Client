import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CarModelListComponent } from './car-model-list/car-model-list.component';
import { CarModelFormComponent } from './car-model-form/car-model-form.component';
import { SharedModule } from '../../shared/shared.module';
const routes: Routes = [
  { path: '',         component: CarModelListComponent },
  { path: 'add',      component: CarModelFormComponent },
  { path: 'edit/:id', component: CarModelFormComponent }
];

@NgModule({
  declarations: [
    CarModelListComponent,
    CarModelFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,           // ← for ngModel
    ReactiveFormsModule,   // ← for formGroup
    RouterModule.forChild(routes)
  ]
})
export class CarModelModule { }