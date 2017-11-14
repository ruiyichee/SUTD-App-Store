import { App } from './app.model';
import { AppDetailComponent } from './app-detail.component';
import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  url: string = 'http://localhost:8000/appstore/';
  appList = [];
  selectedApp: App;
  constructor(
    private http: Http,
    private dialog: MatDialog
  ) { }

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

  openApp(i): void {
    const dialogRef = this.dialog.open(AppDetailComponent, {
      panelClass: 'full-width-dialog',
      height: '100vh',
      width: '100vw',
    });

    dialogRef.componentInstance.selectedApp = this.appList[i];
  }

  openSettings(): void {
    
  }
}
