import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { ChartService } from './service/chart.service';

@Component({
  selector: 'app-chart-dashboard',
  templateUrl: './chart-dashboard.component.html',
  styleUrl: './chart-dashboard.component.scss'
})
export class ChartDashboardComponent implements OnInit {
  chartData: ChartDataset[] = [];
  chartLabels: string[] = [];
  chartOptions: ChartOptions = { responsive: true };
  chartType: ChartType = 'bar';

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData() {
    this.chartService.getChartData().subscribe((data) => {
      this.chartLabels = data.labels;
      this.chartData = data.datasets.map((res:any) => ({
        data: res.values, label: res.label
      }));
    });
  }

  addData() {
    this.chartService.addNewData().subscribe((updatedData) => {
      this.chartLabels = updatedData.labels;
      this.chartData = updatedData.datasets.map((res:any) => ({
        data: res.values, label: res.label
      }));
    });
  }
}

