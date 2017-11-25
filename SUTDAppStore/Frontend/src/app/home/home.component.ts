import { User } from './../models/user.model';
import { UserService } from './../service/user.service';
import { AppService } from './../service/app.service';
import { AppUploadComponent } from './app-upload.component';
import { App } from './../models/app.model';
import { AppDetailComponent } from './app-detail.component';
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
  appList = [];
  developers = ['Jeremy Rose', 'Jon Wong', 'Dorien'];
  years = ['2017', '2016', '2015', '2014'];
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
    private userService: UserService

  ) {
  }

  ngOnInit() {
    this.titleService.setTitle('Home');
    this.ngProgress.start();
    this.appService.getApps().subscribe((apps) => {
      this.appList = apps;
      this.ngProgress.done();
    },
      (err) => { console.log(err) }
    );
    this.userService.getUserDetails().subscribe((user) => {
      this.selectedUser = user[0];
      localStorage.setItem('userid', this.selectedUser.id);
    },
      (err) => { console.log(err) }
    );
    this.subject.debounceTime(500).subscribe(searchTextValue => {
      this.handleSearch(searchTextValue);
    });
  }

  onKeyUp(searchTextValue: string){
    this.subject.next(searchTextValue);
  }

  handleSearch(searchValue: string) {
    this.searchTextValue = searchValue;
    console.log(this.searchTextValue);
  }


  openApp(i) {
    const dialogRef = this.dialog.open(AppDetailComponent, {
      panelClass: 'full-width-dialog',
      height: '100vh',
      width: '100vw',
    });

    dialogRef.componentInstance.selectedApp = this.appList[i];
  }

  uploadApp() {
    const dialogRef = this.dialog.open(AppUploadComponent, {
      panelClass: 'full-width-dialog',
      // height: '80vh',
      width: '80vw',
    });
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


}
