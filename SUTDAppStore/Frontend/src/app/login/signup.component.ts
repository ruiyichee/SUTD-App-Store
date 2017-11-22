// import { Feedback } from './../../models/feedback.model';
import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'signup-component',
    templateUrl: 'signup.component.html',
    styleUrls: ['signup.component.scss']
})
export class SignupComponent implements OnInit {
    // enteredFeedback = new Feedback();
    // enteredStars = '';
    // stars = ['1', '2', '3', '4', '5'];
    constructor(
        public dialogRef: MatDialogRef<SignupComponent>,
    ) { }

    ngOnInit() {
    }

    closeDialog() {
        this.dialogRef.close();
    }

    signup() {
        console.log('attempting to sign up');
    }

}