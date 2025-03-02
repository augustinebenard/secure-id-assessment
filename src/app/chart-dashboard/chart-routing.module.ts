import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartDashboardComponent } from './chart-dashboard.component';

const routes: Routes = [
  {path: "dashboard", component: ChartDashboardComponent},
  {path: "", redirectTo: "dashboard", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartRoutingModule { }
