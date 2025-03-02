import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartRoutingModule } from './chart-routing.module';
import { ChartDashboardComponent } from './chart-dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ChartDashboardComponent],
  imports: [CommonModule, ChartRoutingModule,TranslateModule, NgChartsModule],
})
export class ChartModule {}
