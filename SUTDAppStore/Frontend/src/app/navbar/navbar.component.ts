import { AuthenticationService } from './../service/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout()
      .subscribe(
      data => {
        if (data.status === 200) {
          console.log('logged out successfully');
        }
      },
      error => {
        console.log(error);
      }
      );
  }
}
