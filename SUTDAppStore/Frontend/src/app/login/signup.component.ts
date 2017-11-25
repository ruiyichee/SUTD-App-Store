import { NgProgress } from 'ngx-progressbar';
import { AuthenticationService } from './../service/authentication.service';
import { User } from './../models/user.model';
// import { Feedback } from './../../models/feedback.model';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { SignupService } from '../service/signup.service';

@Component({
    selector: 'signup-component',
    templateUrl: 'signup.component.html',
    styleUrls: ['signup.component.scss']
})
export class SignupComponent implements OnInit {
    // enteredFeedback = new Feedback();
    // enteredStars = '';
    // stars = ['1', '2', '3', '4', '5'];
    // newUser: any = {}; 
    newUser = new User();
    constructor(
        public dialogRef: MatDialogRef<SignupComponent>,
        private signupService: SignupService,
        private authService: AuthenticationService,
        public snackBar: MatSnackBar,
        public ngProgress: NgProgress,        
    ) { }

    ngOnInit() {
    }

    closeDialog() {
        this.dialogRef.close();
    }

    signup() {
        this.ngProgress.start();
        this.authService.signup(this.newUser.username, this.newUser.password1, this.newUser.password2, this.newUser.email).subscribe(
            data => {
                if (data.status === 201) {
                    console.log('signup worked');
                    this.signupService.setUser(this.newUser.first_name, this.newUser.last_name, this.newUser.username).subscribe(
                        data => {
                            if (data === '201') {
                                this.ngProgress.done();
                                this.snackBar.open('Successfully signed up', 'OK', {
                                    duration: 3000,
                                    extraClasses: ['success-snackbar']
                
                                });
                            }
                        }
                    );
                    this.dialogRef.close();
                } else {
                    console.log('signup failed');
                    this.ngProgress.done();                    
                    this.snackBar.open('Failed to signup', 'OK', {
                        duration: 3000,
                        extraClasses: ['failure-snackbar']
    
                    });
                }
            },
            error => {
                console.log(error)
            });
        

    }

}