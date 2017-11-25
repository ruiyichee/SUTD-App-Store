import { Endorsement } from './../models/endorsement.model';
import { Purchase } from './../user-profile/user-profile.component';
import { Feedback } from './../models/feedback.model';
import { App } from './../models/app.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
    feedbackUrl = 'http://localhost:8000/user/feedback/';
    userUrl = 'http://localhost:8000/user/';
    purchaseUrl = 'http://localhost:8000/user/purchase/';
    endorsementUrl = 'http://localhost:8000/user/endorsement/';

    constructor(private http: HttpClient) { }
    getUserDetails(): Observable<User[]> {
        let currentUser = localStorage.getItem('username');
        const currentUserUrl = this.userUrl + currentUser + '/';
        console.log(currentUserUrl);
        return this.http.get<User[]>(currentUserUrl)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getFeedbackHistory(userID): Observable<Feedback[]> {
        const currentUserFeedbackUrl = this.feedbackUrl + userID + '/';
        return this.http.get<Feedback[]>(currentUserFeedbackUrl)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getPurchaseHistory(userID): Observable<Purchase[]> {
        const currentUserPurchaseUrl = this.purchaseUrl + userID + '/';        
        return this.http.get<Purchase[]>(currentUserPurchaseUrl)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getEndorsementHistory(userID): Observable<any[]> {
        const currentUserEndorsementUrl = this.endorsementUrl + userID + '/';        
        return this.http.get<any[]>(currentUserEndorsementUrl)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return Observable.throw(errorMessage);
    }
}    