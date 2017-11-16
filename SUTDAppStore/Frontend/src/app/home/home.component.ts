import { App } from './../models/app.model';
import { AppDetailComponent } from './app-detail.component';
import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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
  constructor(
    private http: Http,
    private dialog: MatDialog
  ) { 
  }

  ngOnInit() {
    this.http.get(this.url).toPromise().then((res) => {
      this.appList = [];
      console.log(res.json().length);
      const jsonArray = res.json();
      for (let i = 0; i < jsonArray.length; i++) {
        let localApp;
        localApp = jsonArray[i];
        this.appList.push(localApp)
      }
      console.log(this.appList);
    });
  }

  openApp(i) {
    // const newURL = this.url + (i+1);
    // console.log(newURL);
    // this.http.get(newURL).toPromise().then((res) => {
    //   console.log(res.json());
    //   const dialogRef = this.dialog.open(AppDetailComponent, {
    //       panelClass: 'full-width-dialog',
    //       height: '100vh',
    //       width: '100vw',
    //     });
    
    //     dialogRef.componentInstance.selectedApp = this.appList[i];
    // });
    const dialogRef = this.dialog.open(AppDetailComponent, {
      panelClass: 'full-width-dialog',
      height: '100vh',
      width: '100vw',
    });

    dialogRef.componentInstance.selectedApp = this.appList[i];
  }

  downloadApp(i, event) {
    const newURL = this.url + (i+1) + '/';
    const appToBeDownloaded = this.appList[i];
    // TODO: GET the appfile from DB
    console.log('trying to download app');
    console.log('not done downloading file yet');
    console.log('Increment to DB');    
    let incrementor = 1;
    this.http.post(newURL, incrementor).toPromise().then((res) => {
      console.log(res.json());
      console.log('succeeded');
    });
    event.stopPropagation();
  }

}
