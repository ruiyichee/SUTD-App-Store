import { AuthenticationService } from './../service/authentication.service';
import { User } from './../models/user.model';
// import { Feedback } from './../../models/feedback.model';
import { MatDialogRef } from '@angular/material';
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
        private authService: AuthenticationService
    ) { }

    ngOnInit() {
    }

    closeDialog() {
        this.dialogRef.close();
    }

    autocomplete() {
        this.newUser.first_name = 'Dorien';
        this.newUser.last_name = 'Marien';
        this.newUser.email = 'dorien@gmail.com';
        this.newUser.username = 'dorienmarien';
        this.newUser.password1 = 'password1234';
        this.newUser.password2 = 'password1234';
        this.newUser.dob = '11/24/2017';
    }

    signup() {
        this.authService.signup(this.newUser.username, this.newUser.password1, this.newUser.password2, this.newUser.email)
            .subscribe(
            data => {
                console.log(data);
                if (data.status === 201) {
                    console.log('it worked');
                    this.dialogRef.close();                    
                }else {
                    console.log('it failed');
                }
            },
            error => {
                console.log(error)
            });

    }

}