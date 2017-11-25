import { NgProgress } from 'ngx-progressbar';
import { AppService } from './../../service/app.service';
import { Feedback } from './../../models/feedback.model';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-feedback-component',
    templateUrl: 'app-feedback.component.html',
    styleUrls: ['app-feedback.component.scss']
})
export class AppFeedbackComponent implements OnInit {
    enteredFeedback = new Feedback();
    public appID: String;
    enteredStars = '';
    stars = ['1', '2', '3', '4', '5'];
    enteredComments = '';
    constructor(
        public dialogRef: MatDialogRef<AppFeedbackComponent>,
        private appService: AppService,
        public ngProgress: NgProgress, 
        public snackBar: MatSnackBar,        
    ) { }

    ngOnInit() {

    }

    closeDialog() {
        this.dialogRef.close();
    }

    uploadFeedback() {
        this.ngProgress.start();        
        console.log('attempting post request');
        // console.log(this.enteredFeedback);
        this.enteredFeedback.comments = this.enteredComments;
        this.enteredFeedback.stars = this.enteredStars;
        this.enteredFeedback.uid = localStorage.getItem('userid');
        console.log(this.enteredFeedback);
        this.appService.setFeedback(this.enteredFeedback, this.appID).subscribe((res) => {
            if (res === '201') {
                this.dialogRef.close();
                this.snackBar.open('Thanks for your feedback', 'OK', {
                    duration: 3000,
                    extraClasses: ['success-snackbar']

                });
            } else {
                this.dialogRef.close();
                this.snackBar.open('Failed to feedback', 'OK', {
                    duration: 3000,
                    extraClasses: ['failure-snackbar']

                });
            }
            this.ngProgress.done();
        }, (err) => { console.log(err) }
        );


    }

}