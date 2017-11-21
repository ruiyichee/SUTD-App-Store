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
    feedbackUrl = 'http://localhost:8000/user/feedback/1/';
    userUrl = 'http://localhost:8000/user/2/';
    purchaseUrl = 'http://localhost:8000/user/purchase/2/';

    constructor(private http: HttpClient) { }
    getUserDetails(): Observable<User[]> {
        return this.http.get<User[]>(this.userUrl)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getFeedbackHistory(): Observable<Feedback[]> {
        return this.http.get<Feedback[]>(this.feedbackUrl)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getPurchaseHistory(): Observable<Purchase[]> {
        return this.http.get<Purchase[]>(this.purchaseUrl)
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