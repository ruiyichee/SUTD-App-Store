import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class SalesComponent implements OnInit {
  public barChartOptions: any = {
    scales: {
      xAxes: [{
        barPercentage: 0.3,
        gridLines: {
          color: 'rgba(0, 0, 0, 0)',
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(0, 0, 0, 0)',
        },
        ticks: {
          beginAtZero: true,
          userCallback: function (value, index, values) {
            return '';
          }
        }
      }]
    },
    legend: {
      display: false
    },
    scaleShowVerticalLines: false,
    responsive: true,
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart'
    }
  };
  public barChartLabelsSkills: string[] = ['Adobe PS', 'Adobe AE', 'Sketch', 'Unity', 'Ionic 2', 'Angular 2'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barColors = [
    {
      backgroundColor: [
        'rgba(0, 0, 0, 1)',
        'rgba(0, 0, 0, 1)',
        'rgba(0, 0, 0, 1)',
        'rgba(0, 0, 0, 1)',
        'rgba(0, 0, 0, 1)',
        'rgba(0, 0, 0, 1)'
      ]
    }
  ];  
  public barChartDataSkills: any[] = [
    { data: [65, 70, 85, 80, 70, 85], label: 'Technical Skills' }
  ];
  constructor() { }

  ngOnInit() {

  }
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
