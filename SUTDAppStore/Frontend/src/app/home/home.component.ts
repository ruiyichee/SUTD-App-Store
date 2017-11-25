import { Router } from '@angular/router';
import { User } from './../models/user.model';
import { UserService } from './../service/user.service';
import { AppService } from './../service/app.service';
import { AppUploadComponent } from './app-upload.component';
import { App } from './../models/app.model';
import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { NgProgress } from 'ngx-progressbar';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  url: string = 'http://localhost:8000/appstore/';
  appList: App[];
  recommendedAppList: App[] = [];
  prices = ['<5', '5 - 10', '> 10'];
  genres = ['3D', '2D'];
  selectedPriceRange = '';
  selectedApp: App;
  randomVar: any;
  selectedUser = new User();
  searchTextValue = '';
  private subject: Subject<string> = new Subject();

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private titleService: Title,
    public ngProgress: NgProgress,
    private appService: AppService,
    private userService: UserService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle('Home');
    this.ngProgress.start();
    this.appService.getApps().subscribe((apps) => {
      this.appList = apps;
      console.log(this.appList);
      this.ngProgress.done();
    },
      (err) => { console.log(err) }
    );
    this.userService.getUserDetails().subscribe((user) => {
      this.selectedUser = user[0];
      localStorage.setItem('userid', this.selectedUser.id);
      this.appService.getRecommendedApps(this.selectedUser.id).subscribe((apps) => {
        this.recommendedAppList = apps;
      })
    },
      (err) => { console.log(err) }
    );
    this.subject.debounceTime(300).subscribe(searchTextValue => {
      this.handleSearch(searchTextValue);
    });
  }

  onKeyUp(searchTextValue: string) {
    this.subject.next(searchTextValue);
  }

  handleSearch(searchValue: string) {
    this.searchTextValue = searchValue;
    console.log(this.searchTextValue);
    this.ngProgress.start();
    this.appService.searchApp(this.searchTextValue).subscribe((apps) => {
      this.appList = apps;
      this.ngProgress.done();
    },
      (err) => { console.log(err) }
    );
  }

  routeToApp(i) {
    let data = this.appList[i];
    this.router.navigate(['/app-details', data]);
  }

  routeToRecommendedApp(i) {
    let data = this.recommendedAppList[i];
    this.router.navigate(['/app-details', data]);
  }

  downloadApp(i, event) {
    const newURL = this.url + (i + 1) + '/';
    const appToBeDownloaded = this.appList[i];
    // TODO: GET the appfile from DB
    console.log('trying to download app');
    console.log('not done downloading file yet');
    console.log('Increment to DB');
    let incrementor = 1;
    this.http.post(newURL, incrementor).toPromise().then((res) => {
      // console.log(res.json());
      console.log('succeeded');
    });
    event.stopPropagation();
  }

  filterPrice() {
    console.log('price changed');
    console.log(this.selectedPriceRange);
  }


}
