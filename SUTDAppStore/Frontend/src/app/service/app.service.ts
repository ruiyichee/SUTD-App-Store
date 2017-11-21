import { Feedback } from './../models/feedback.model';
import { App } from './../models/app.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {
    private appUrl = 'http://localhost:8000/appstore/';
    private feedbackUrl = 'http://localhost:8000/appstore/feedback/';

    constructor(private http: HttpClient) { }

    getApps(): Observable<App[]> {
        return this.http.get<App[]>(this.appUrl)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getFeedbacks(appID): Observable<Feedback[]> {
        const appFeedbackUrl = this.feedbackUrl + appID + '/';
        return this.http.get<Feedback[]>(appFeedbackUrl)
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