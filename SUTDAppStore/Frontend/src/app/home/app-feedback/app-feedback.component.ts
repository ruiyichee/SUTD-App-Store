import { Feedback } from './../../models/feedback.model';
import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
    selector: 'app-feedback-component',
    templateUrl: 'app-feedback.component.html',
    styleUrls: ['app-feedback.component.scss']
})
export class AppFeedbackComponent implements OnInit {
    // enteredFeedback = new Feedback();
    enteredStars = '';
    stars = ['1', '2', '3', '4', '5'];
    constructor(
        public dialogRef: MatDialogRef<AppFeedbackComponent>,
        private http: Http,
    ) { }

    ngOnInit() {
    }

    closeDialog() {
        this.dialogRef.close();
    }

    upload() {
        console.log('attempting post request');
    }

}