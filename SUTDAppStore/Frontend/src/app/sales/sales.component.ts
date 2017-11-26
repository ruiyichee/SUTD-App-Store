import { fadeInAnimation } from './../fade-in.animation';
import { NgProgress } from 'ngx-progressbar';
import { AdminService } from './../service/admin.service';
import { Component, OnInit, ViewChild, HostBinding } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit {
  @ViewChild("appsChart")
  appsChart: BaseChartDirective;
  @ViewChild("devChart")
  devChart: BaseChartDirective;
  @ViewChild("genreChart")
  genreChart: BaseChartDirective;

  public barChartOptions: any = {
    scales: {
      xAxes: [{
        barPercentage: 0.2,
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
  public barChartLabelsSkills: string[] = ['Adobe PS', 'Adobe AE', 'Sketch', 'Unity', 'Ionic 2', 'Angular 2'];
  public barChartDataSkills: any[] = [
    { data: [65, 70, 85, 80, 70, 85], label: 'Technical Skills' }
  ];
  public barChartAppsLabel = []
  public barChartAppsData = [65]
  public barChartAppsDataLabel: any[] = [
    { data: this.barChartAppsData, label: 'Popular Apps' }
  ]
  public barChartDevLabel = []
  public barChartDevData = [65]
  public barChartDevDataLabel: any[] = [
    { data: this.barChartDevData, label: 'Popular Developers' }
  ]
  public barChartGenreLabel = []
  public barChartGenreData = [65]
  public barChartGenreDataLabel: any[] = [
    { data: this.barChartGenreData, label: 'Popular Genre' }
  ]
  constructor(
    private adminService: AdminService,
    public ngProgress: NgProgress
  ) { }

  ngOnInit() {
    this.ngProgress.start();
    this.adminService.getPopularApps().subscribe((apps) => {
      this.barChartAppsDataLabel.pop();
      this.barChartAppsData = [];
      this.barChartAppsDataLabel = [];      
      for (let i = 0; i < apps.length; i++) {
        this.barChartAppsLabel.push(apps[i]["app_name"]);
        this.barChartAppsData.push(apps[i]["no_of_downloads"]);
        this.ngProgress.done();
        if (this.appsChart !== undefined) {
          this.appsChart.ngOnDestroy();
          this.appsChart.chart = this.appsChart.getChartBuilder(this.appsChart.ctx);
        }
      }
    });
    this.adminService.getPopularDevelopers().subscribe((developers) => {
      this.barChartDevDataLabel.pop();
      this.barChartDevData = [];
      this.barChartDevDataLabel = [];      
      for (let i = 0; i < developers.length; i++) {
        this.barChartDevLabel.push(developers[i]["first_name"]);
        this.barChartDevData.push(developers[i]["no_of_downloads"]);
        this.ngProgress.done();
        if (this.devChart !== undefined) {
          this.devChart.ngOnDestroy();
          this.devChart.chart = this.devChart.getChartBuilder(this.devChart.ctx);
        }
      }
    });
    this.adminService.getPopularGenre().subscribe((genre) => {
      this.barChartGenreDataLabel.pop();
      this.barChartGenreData = [];
      this.barChartGenreDataLabel = [];      
      for (let i = 0; i < genre.length; i++) {
        this.barChartGenreLabel.push(genre[i]["genre"]);
        this.barChartGenreData.push(genre[i]["count"]);
        this.ngProgress.done();
        if (this.genreChart !== undefined) {
          this.genreChart.ngOnDestroy();
          this.genreChart.chart = this.genreChart.getChartBuilder(this.genreChart.ctx);
        }
      }
    });
  
  }


  public chartClicked(e: any): void {
  console.log(e);
}

  public chartHovered(e: any): void {
  console.log(e);
}

}
