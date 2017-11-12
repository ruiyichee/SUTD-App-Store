import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;  
  url: string = 'http://localhost:8000/login/';
  
  constructor(private http: Http) { }

  ngOnInit() {
  }

  login() {
    console.log('trying to log in');
    this.http.get(this.url).toPromise().then((res) => {
      console.log(res.json());
    });
  }

}
