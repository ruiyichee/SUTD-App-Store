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

  constructor(
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
    
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
  uploadApp() {
    const dialogRef = this.dialog.open(AppUploadComponent, {
      panelClass: 'full-width-dialog',
      // height: '80vh',
      width: '80vw',
    });
  }
}
