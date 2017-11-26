import { AppFeedbackComponent } from './../home/app-feedback/app-feedback.component';
import { Endorsement } from '../models/endorsement.model';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AppService } from './../service/app.service';
import { NgProgress } from 'ngx-progressbar';
import { Http } from '@angular/http';
import { App } from './../models/app.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-home-app-details',
  templateUrl: './home-app-details.component.html',
  styleUrls: ['./home-app-details.component.scss'],
})
export class HomeAppDetailsComponent implements OnInit {
  selectedApp = new App();
  private sub: any;
  url: string = 'http://localhost:8000/appstore/feedback/';
  endorsementUrl = 'http://localhost:8000/appstore/feedback/endorsement/'
  feedbackList = [];
  totalFeedbackList = [];
  screenshots = [];
  usefulnessScore = [];
  selectedScore = '';
  filteredFeedbackList = [];
  feedbackLength;
  appIcon: string;
  averageFeedbackScore = 0;
  enteredFeedbackEndorsement = new Endorsement();

  constructor(
    private route: ActivatedRoute,
    private http: Http,
    public ngProgress: NgProgress,
    private appService: AppService,
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      console.log(params);
      this.selectedApp.aid = params['aid'];
      this.selectedApp.app_name = params['app_name'];
      this.selectedApp.description = params['description'];
      this.selectedApp.genre = params['genre'];
      this.selectedApp.icon = params['icon'];
      this.selectedApp.price = params['price'];
      this.selectedApp.date_of_upload = params['date_of_upload'];
    });
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
        this.totalFeedbackList = feedbacks;
        this.feedbackLength = this.totalFeedbackList.length;
        let totalScore = 0;
        for (let i = 0; i < this.feedbackList.length; i++) {
          this.usefulnessScore.push(i + 1);
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
  openFeedback() {
    const dialogRef = this.dialog.open(AppFeedbackComponent, {
      panelClass: 'full-width-dialog',
      width: '80vw',
    });
    dialogRef.componentInstance.appID = this.selectedApp.aid;
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.appService.getFeedbacks(this.selectedApp.aid).subscribe(
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
    });
  }

  endorseUp(i) {
    this.ngProgress.start();
    this.enteredFeedbackEndorsement.thumbs = '1';
    this.enteredFeedbackEndorsement.fid = this.feedbackList[i].fid;
    this.enteredFeedbackEndorsement.uid = localStorage.getItem('userid');
    this.appService.setFeedbackEndorsement(this.enteredFeedbackEndorsement, this.selectedApp.aid).subscribe((res) => {
      if (res === '201') {
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

  filterFeedback() {
    if (this.selectedScore) {
      this.ngProgress.start();
      let userID = localStorage.getItem('userid');
      this.appService.getNumberOfFeedbacks(this.selectedScore, this.selectedApp.aid, userID).subscribe((feedbacks) => {
        this.filteredFeedbackList = feedbacks;
        let tempList = []
        for (let i = 0; i < this.totalFeedbackList.length; i++) {
          for (let j = 0; j < this.filteredFeedbackList.length; j++) {
            if (this.totalFeedbackList[i].fid === this.filteredFeedbackList[j].fid) {
              tempList.push(this.totalFeedbackList[i]);
            }
          }
        }
        this.feedbackList = tempList;
        this.ngProgress.done();
      });
    } else {
      this.feedbackList = this.totalFeedbackList;
    }




  }

}
