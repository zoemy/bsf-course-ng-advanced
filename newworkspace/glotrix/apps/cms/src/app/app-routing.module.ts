import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login-layout/login-layout.module').then(
        m => m.LoginLayoutModule
      )
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard-layout/dashboard-layout.module').then(
        m => m.DashboardLayoutModule
      )
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
