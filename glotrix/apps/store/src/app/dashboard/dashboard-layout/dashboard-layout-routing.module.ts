import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { appModulesAsLinkOption, appModules } from './modules.routes';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      ...appModules,
      {
        path: '',
        redirectTo: appModulesAsLinkOption[0].url,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardLayoutRoutingModule { }
