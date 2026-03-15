import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CommissionReportComponent } from './commission-report/commission-report.component';

const routes: Routes = [
  { path: '', component: CommissionReportComponent }
];

@NgModule({
  declarations: [CommissionReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CommissionModule { }