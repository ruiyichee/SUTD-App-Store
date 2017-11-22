import { RequestOptions } from '@angular/http';
import { Feedback } from './../models/feedback.model';
import { App } from './../models/app.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {
    private appUrl = 'http://localhost:8000/appstore/';
    private feedbackUrl = 'http://localhost:8000/appstore/feedback/';
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    constructor(private http: HttpClient) { }

    getApps(): Observable<App[]> {
        return this.http.get<App[]>(this.appUrl)
            .do(data => console.log('get success'))
            .catch(this.handleError);
    }

    getFeedbacks(appID): Observable<Feedback[]> {
        const appFeedbackUrl = this.feedbackUrl + appID + '/';
        return this.http.get<Feedback[]>(appFeedbackUrl)
        .do(data => console.log('get success'))
        .catch(this.handleError);
    }

    setApp(app): Observable<any> {
        // let headers = new Headers({ 'Content-Type': 'application/json' });
        // return this.http.post<any>(this.appUrl, JSON.stringify(app), {headers: this.headers})
        // .do(data => console.log(JSON.stringify(data)))
        // // .catch(this.handleError);

        return this.http.post(this.appUrl, JSON.stringify(app), {headers: this.headers,responseType: 'text'}) // ...using post request
        // .map((res) => console.log(res)) // ...and calling .json() on the response to return data
        .catch(this.handleError); //...errors if any
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