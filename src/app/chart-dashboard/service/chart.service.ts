import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private jsonUrl = 'assets/data.json';

  constructor(private http: HttpClient) {}

  getChartData(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }

  addNewData(): Observable<any> {
    return this.getChartData().pipe(
      map(data => {
        const newLabel = `New ${data.labels.length + 1}`;
        const updatedLabels = [...data.labels, newLabel];

        const updatedDatasets = data.datasets.map((dataset:any) => ({
          label: dataset.label,
          values: [...dataset.values, Math.floor(Math.random() * 100)]
        }));

        return { labels: updatedLabels, datasets: updatedDatasets };
      })
    );
  }

}
