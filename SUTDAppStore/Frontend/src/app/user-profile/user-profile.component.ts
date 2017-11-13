import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {

  url: string = 'http://localhost:8000/user/???';
  constructor(private http: Http) { }

  ngOnInit() {
    this.http.get(this.url).toPromise().then((res) => {
        
    });
  }

}
