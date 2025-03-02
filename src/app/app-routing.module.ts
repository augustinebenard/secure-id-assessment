import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'products', loadChildren: () => import('./products/product-list.module').then(m => m.ProductListModule) },
  { path: 'cart', loadChildren: () => import('./cart-management/cart.module').then(m => m.CartModule) },
  {path: "chart", loadChildren: () => import('./chart-dashboard/chart.module').then(m => m.ChartModule)},
  {path: '', redirectTo: 'products', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
