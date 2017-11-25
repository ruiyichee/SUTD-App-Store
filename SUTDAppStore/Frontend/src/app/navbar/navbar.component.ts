import { UserService } from './../service/user.service';
import { User } from './../models/user.model';
import { MatDialog } from '@angular/material';
import { AppUploadComponent } from './../home/app-upload.component';
import { AuthenticationService } from './../service/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  selectedUser = new User();
  constructor(
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getUserDetails().subscribe((user) => {
      this.selectedUser = user[0];
      (err) => { console.log(err) }
    });
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
  uploadApp() {
    const dialogRef = this.dialog.open(AppUploadComponent, {
      panelClass: 'full-width-dialog',
      // height: '80vh',
      width: '80vw',
    });
  }
}
