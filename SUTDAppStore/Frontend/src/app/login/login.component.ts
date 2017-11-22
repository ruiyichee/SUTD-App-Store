import { SignupComponent } from './signup.component';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from '../service/authentication.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private title: Title,
      private dialog: MatDialog,      
//       private alertService: AlertService
) { }

  ngOnInit() {
      this.title.setTitle('Login');
      // reset login status
      this.authenticationService.logout();

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    console.log(this.model.username + this.model.password);
      this.loading = true;
      this.authenticationService.login(this.model.username, this.model.password)
          .subscribe(
              data => {
                  console.log("testing");
                  console.log(data);
                  this.router.navigate([this.returnUrl]);
              },
              error => {
                console.log("Error logging in");
                 // this.alertService.error(error);
                  this.loading = false;
              });
  }
  signup() {
    const dialogRef = this.dialog.open(SignupComponent, {
      panelClass: 'full-width-dialog',      
      // width: '80vw',
  });

  }
}
