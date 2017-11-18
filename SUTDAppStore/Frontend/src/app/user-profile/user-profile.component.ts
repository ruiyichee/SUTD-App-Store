import { User } from './../models/user.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { MatPaginator } from '@angular/material';
import { PageEvent } from '@angular/material';

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
  constructor(private http: Http) { }
  selectedUser = new User();
  displayedPurchaseColumns = ['aid', 'app_name', 'price', 'purchase_date', 'genre'];
  displayedFeedbackColumns = ['fid', 'stars', 'comments', 'feed_date'];
  purchaseDataSource: any;
  feedbackDataSource: any;

  length = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  ngOnInit() {
    feedbackHistory = [];
    purchaseHistory = [];
    // fetch user information
    this.http.get(this.userUrl).toPromise().then((res) => {
      const jsonArray = res.json();
      for (let i = 0; i < jsonArray.length; i++) {
        this.selectedUser = jsonArray[i];
      }
    });
    // fetch purchase info
    this.http.get(this.purchaseUrl).toPromise().then((res) => {
      const jsonArray = res.json();
      for (let i = 0; i < jsonArray.length; i++) {
        purchaseHistory.push(jsonArray[i]);

      }
      console.log(purchaseHistory);
      this.purchaseDataSource = new PurchaseDataSource();
    });
    // fetch feedback info
    this.http.get(this.feedbackUrl).toPromise().then((res) => {
      const jsonArray = res.json();
      for (let i = 0; i < jsonArray.length; i++) {
        feedbackHistory.push(jsonArray[i]);
      }
      console.log(feedbackHistory);
      this.feedbackDataSource = new FeedbackDataSource();
    });
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
let feedbackHistory = []
let purchaseHistory = []

export class FeedbackDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Feedback[]> {
    console.log('FEEDBACK');
    console.log(feedbackHistory);
    return Observable.of(feedbackHistory);
  }

  disconnect() { }
}

export class PurchaseDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Purchase[]> {
    console.log('PURCHASE');
    console.log(purchaseHistory);
    return Observable.of(purchaseHistory);
  }

  disconnect() { }
}

