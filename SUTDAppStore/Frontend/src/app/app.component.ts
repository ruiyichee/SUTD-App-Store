import { App } from './app.model';
import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  url: string = 'http://localhost:8000/appstore/';
  appList = [];
  constructor(private http: Http) { }
  
  public getApps() {
    this.http.get(this.url).toPromise().then((res) => {
      this.appList = [];
      console.log(res.json().length);
      const jsonArray = res.json();
      for (let i = 0; i < jsonArray.length; i++) {
        let localApp = new App();
        localApp = jsonArray[i];
        this.appList.push(localApp)     
      }
      console.log(this.appList);
    });

  }
}
