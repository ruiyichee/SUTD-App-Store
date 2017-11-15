import { User } from './user.model';
import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {

  // url: string = 'http://localhost:8000/user/???';
  constructor(private http: Http) { }
  selectedUser = new User();

  ngOnInit() {
    // this.http.get(this.url).toPromise().then((res) => {
    this.selectedUser.first_name = 'Jeremy';
    this.selectedUser.last_name = 'Rose';
    this.selectedUser.email = 'jeremyrose@gmail.com';
    this.selectedUser.username = 'jeremyrose';
    // this.selectedUser.first_name = 'Jeremy';
    
    // });
  }

}
