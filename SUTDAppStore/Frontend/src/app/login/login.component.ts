import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

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
  constructor(private http: Http) { }

  ngOnInit() {
  }

  login() {
    console.log('trying to log in');
    // send username and password as a JSON to Django to process
    this.http.post(this.url, this.enteredUsername).toPromise().then((res) => {
      console.log(res.status);
    });
  }

}
