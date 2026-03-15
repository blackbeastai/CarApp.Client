import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  // Default redirect
  {
    path: '',
    redirectTo: 'car-model',
    pathMatch: 'full'
  },

  // Auth module — lazy loaded
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module')
        .then(m => m.AuthModule)
  },

  // Car Model module — lazy loaded + protected
  {
    path: 'car-model',
    loadChildren: () =>
      import('./modules/car-model/car-model.module')
        .then(m => m.CarModelModule),
    canActivate: [AuthGuard]
  },

  // // Commission module — lazy loaded + protected
  {
    path: 'commission',
    loadChildren: () =>
      import('./modules/commission/commission.module')
        .then(m => m.CommissionModule),
    canActivate: [AuthGuard]
  },

  // Catch all — redirect to car-model
  {
    path: '',
    redirectTo: 'car-model',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }