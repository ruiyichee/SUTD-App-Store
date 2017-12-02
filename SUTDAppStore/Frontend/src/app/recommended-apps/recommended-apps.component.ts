import { AppService } from './../service/app.service';
import { NgProgress } from 'ngx-progressbar';
import { App } from './../models/app.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recommended-apps',
  templateUrl: './recommended-apps.component.html',
  styleUrls: ['./recommended-apps.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class RecommendedAppsComponent implements OnInit {
  recommendedAppList: App[];
  popularAppList: App[];
  
  constructor(
    public ngProgress: NgProgress,
    private appService: AppService,    
  ) { }

  ngOnInit() {
    this.ngProgress.start();
    let userID = localStorage.getItem("userid");
    this.appService.getRecommendedApps(userID).subscribe((apps) => {
      this.recommendedAppList = apps;
      console.log(this.recommendedAppList);
      this.ngProgress.done();
    },
      (err) => { console.log(err) }
    );

  }

}
