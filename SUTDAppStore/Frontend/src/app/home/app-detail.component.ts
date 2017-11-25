import { AppService } from './../service/app.service';
import { App } from './../models/app.model';
import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AppFeedbackComponent } from './app-feedback/app-feedback.component';
import { NgProgress } from 'ngx-progressbar';
import { Endorsement } from '../models/endorsement.model';

@Component({
    selector: 'app-detail-component',
    templateUrl: 'app-detail.component.html',
    styleUrls: ['app-detail.component.scss']
})
export class AppDetailComponent implements OnInit {

    public selectedApp = new App();
    url: string = 'http://localhost:8000/appstore/feedback/';
    endorsementUrl = 'http://localhost:8000/appstore/feedback/endorsement/'
    feedbackList = [];
    screenshots = [];
    appIcon: string;
    averageFeedbackScore = 0;
    enteredFeedbackEndorsement = new Endorsement();

    constructor(
        public dialogRef: MatDialogRef<AppDetailComponent>,
        private http: Http,
        private dialog: MatDialog,
        public ngProgress: NgProgress,
        private appService: AppService,
        public snackBar: MatSnackBar,

    ) { }

    ngOnInit(): void {
        // fake description and screenshot and icon
        this.ngProgress.start();
        this.selectedApp.description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin finibus aliquam cursus. Proin non sem rhoncus, pellentesque nisl vel, ornare felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin finibus aliquam cursus. Proin non sem rhoncus, pellentesque nisl vel, ornare felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin finibus aliquam cursus. Proin non sem rhoncus, pellentesque nisl vel, ornare felis. ';
        this.appIcon = "assets/img/appicon1.svg";
        // this.screenshots.push('assets/img/screenshot1.svg');
        // this.screenshots.push('assets/img/screenshot1.svg');
        // this.screenshots.push('assets/img/screenshot1.svg');

        // get feedback
        const appID = this.selectedApp.aid;
        console.log(appID);
        const newURL = this.url + appID + '/';
        this.appService.getFeedbacks(appID).subscribe(
            (feedbacks) => {
                this.feedbackList = feedbacks;
                let totalScore = 0;
                for (let i = 0; i < this.feedbackList.length; i++) {
                    let currentScore = +this.feedbackList[i].stars;
                    totalScore += currentScore;
                }
                this.averageFeedbackScore = Math.ceil(totalScore / this.feedbackList.length);
                console.log(this.averageFeedbackScore);
                console.log(this.feedbackList);

            },
            (err) => { console.log(err) }
        );
        this.appService.getFeedbackEndorsement(appID).subscribe(
            (endorsements) => {
                console.log(endorsements);
                for (let i = 0; i < this.feedbackList.length; i++) {
                    for (let j = 0; j < endorsements.length; j++) {
                        if (endorsements[j].fid == this.feedbackList[i].fid) {
                            this.feedbackList[i].thumbs_up = endorsements[j].up;
                            this.feedbackList[i].thumbs_down = endorsements[j].down;
                        }
                    }
                }
                this.ngProgress.done();

            },
            (err) => { console.log(err) }
        );
    }

    closeDialog() {
        this.dialogRef.close();
    }

    downloadApp(event) {
        // const appID = this.selectedApp.aid;
        // console.log(appID);
        // const newURL = this.url + appID + '/';
        // const appToBeDownloaded = this.selectedApp;
        // // TODO: GET the appfile from DB
        // console.log('trying to download app');
        // console.log('not done downloading file yet');
        // console.log('Increment to DB');
        // let incrementor = 1;
        // this.http.post(newURL, incrementor).toPromise().then((res) => {
        //     console.log(res.json());
        //     console.log('succeeded');
        // });
        // event.stopPropagation();
    }
    openFeedback() {
        const dialogRef = this.dialog.open(AppFeedbackComponent, {
            panelClass: 'full-width-dialog',
            width: '80vw',
        });
        dialogRef.componentInstance.appID = this.selectedApp.aid;
    }

    endorseUp(i) {
        this.ngProgress.start();
        this.enteredFeedbackEndorsement.thumbs = '1';
        this.enteredFeedbackEndorsement.fid = this.feedbackList[i].fid;
        this.enteredFeedbackEndorsement.uid = localStorage.getItem('userid');
        this.appService.setFeedbackEndorsement(this.enteredFeedbackEndorsement, this.selectedApp.aid).subscribe((res) => {
            if (res === '201') {
                this.dialogRef.close();
                this.appService.getFeedbackEndorsement(this.selectedApp.aid).subscribe(
                    (endorsements) => {
                        console.log(endorsements);
                        for (let i = 0; i < this.feedbackList.length; i++) {
                            for (let j = 0; j < endorsements.length; j++) {
                                if (endorsements[j].fid == this.feedbackList[i].fid) {
                                    this.feedbackList[i].thumbs_up = endorsements[j].up;
                                    this.feedbackList[i].thumbs_down = endorsements[j].down;
                                }
                            }
                        }
                        this.ngProgress.done();

                    },
                    (err) => { console.log(err) }
                );
                this.ngProgress.done();
                this.snackBar.open('Thanks for your feedback', 'OK', {
                    duration: 3000,
                    extraClasses: ['success-snackbar']

                });
            } else {
                this.dialogRef.close();
                this.ngProgress.done();
                this.ngOnInit();
                this.snackBar.open('Failed to feedback', 'OK', {
                    duration: 3000,
                    extraClasses: ['failure-snackbar']

                });
            }
            this.ngProgress.done();
        }, (err) => { console.log(err) }
        );
    }

    endorseDown(i) {
        this.ngProgress.start();
        this.enteredFeedbackEndorsement.thumbs = '-1';
        this.enteredFeedbackEndorsement.uid = localStorage.getItem('userid');
        this.enteredFeedbackEndorsement.fid = this.feedbackList[i].fid;
        this.appService.setFeedbackEndorsement(this.enteredFeedbackEndorsement, this.selectedApp.aid).subscribe((res) => {
            if (res === '201') {
                this.dialogRef.close();
                this.appService.getFeedbackEndorsement(this.selectedApp.aid).subscribe(
                    (endorsements) => {
                        console.log(endorsements);
                        for (let i = 0; i < this.feedbackList.length; i++) {
                            for (let j = 0; j < endorsements.length; j++) {
                                if (endorsements[j].fid == this.feedbackList[i].fid) {
                                    this.feedbackList[i].thumbs_up = endorsements[j].up;
                                    this.feedbackList[i].thumbs_down = endorsements[j].down;
                                }
                            }
                        }
                        this.ngProgress.done();

                    },
                    (err) => { console.log(err) }
                );
                this.ngProgress.done();
                this.snackBar.open('Thanks for your feedback', 'OK', {
                    duration: 3000,
                    extraClasses: ['success-snackbar']

                });
            } else {
                this.dialogRef.close();
                this.ngProgress.done();
                this.ngOnInit();
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
