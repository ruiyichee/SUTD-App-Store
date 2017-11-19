import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;  
  url: string = 'http://localhost:8000/login/';
  enteredUsername = '';
  enteredPassword = '';
  constructor(
    private http: Http,
    private titleService: Title
    
  ) { }

  ngOnInit() {
    this.titleService.setTitle('SUTD Appstore');    
  }

  login() {
    console.log('trying to log in');
    // send username and password as a JSON to Django to process
    this.http.post(this.url, this.enteredUsername).toPromise().then((res) => {
      console.log(res.status);
    });
  }

}
