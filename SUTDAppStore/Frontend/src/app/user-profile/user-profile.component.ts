// import { Endorsement } from './../models/endorsement.model';
import { UserService } from './../service/user.service';
import { User } from './../models/user.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { MatPaginator } from '@angular/material';
import { PageEvent } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { NgProgress } from 'ngx-progressbar';

import 'rxjs/add/observable/of';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {

  feedbackUrl = 'http://localhost:8000/user/feedback/1/';
  userUrl = 'http://localhost:8000/user/2/';
  purchaseUrl = 'http://localhost:8000/user/purchase/2/';
  constructor(
    private http: Http,
    private titleService: Title,
    public ngProgress: NgProgress,
    private userService: UserService
  ) { }
  selectedUser = new User();
  displayedPurchaseColumns = ['aid', 'app_name', 'price', 'purchase_date', 'genre'];
  displayedFeedbackColumns = ['fid', 'stars', 'comments', 'feed_date'];
  displayedFeedbackEndorsementColumns = ['eid', 'fid', 'app_name', 'thumbs'];
  purchaseDataSource: any;
  feedbackDataSource: any;
  endorsementDataSource: any;

  // length = 100;
  // pageSize = 10;
  // pageSizeOptions = [5, 10, 25, 100];

  // pageEvent: PageEvent;

  // setPageSizeOptions(setPageSizeOptionsInput: string) {
  //   this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  // }

  ngOnInit() {
    this.titleService.setTitle('User Profile');
    feedbackHistory = [];
    purchaseHistory = [];
    // fetch user information

    this.ngProgress.start();
    this.userService.getUserDetails().subscribe((user) => {
      this.selectedUser = user[0];
      this.userService.getPurchaseHistory(this.selectedUser.id).subscribe((purchases) => {
        purchaseHistory = purchases;
        this.purchaseDataSource = new PurchaseDataSource();
      },
        (err) => { console.log(err) }
      );
      this.userService.getFeedbackHistory(this.selectedUser.id).subscribe((feedbacks) => {
        feedbackHistory = feedbacks;
        this.feedbackDataSource = new FeedbackDataSource();
      },
        (err) => { console.log(err) }
      );
      this.userService.getEndorsementHistory(this.selectedUser.id).subscribe((endorsements) => {
        endorsementHistory = endorsements;
        this.endorsementDataSource = new EndorsementDataSource();
        this.ngProgress.done();
      },
        (err) => { console.log(err) }
      );
    },
      (err) => { console.log(err) }
    );

  }
}

export interface Feedback {
  fid: number;
  stars: number;
  comments: string;
  feed_date: string;
}
export interface Purchase {
  aid: number;
  app_name: string;
  price: number;
  purchase_date: string;
  genre: string;
}

export interface Endorsement {
  eid: number;
  fid: number;
  app_name: string;
  thumbs: string;
}

let feedbackHistory = []
let purchaseHistory = []
let endorsementHistory = []

export class FeedbackDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Feedback[]> {
    console.log(feedbackHistory);
    return Observable.of(feedbackHistory);
  }

  disconnect() { }
}

export class PurchaseDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Purchase[]> {
    console.log(purchaseHistory);
    return Observable.of(purchaseHistory);
  }

  disconnect() { }
}

export class EndorsementDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Endorsement[]> {
    console.log(endorsementHistory);
    return Observable.of(endorsementHistory);
  }

  disconnect() { }
}

