import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  url: string = 'http://localhost:8000/appstore/';
  appList = [];
  constructor(private http: Http) { }

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

  public getApps() {

  }

}
