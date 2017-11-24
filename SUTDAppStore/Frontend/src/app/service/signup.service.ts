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
export class SignupService {
    private signupUrl = 'http://localhost:8000/signup/';
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    constructor(private http: HttpClient) { }

    setUser(user): Observable<any> {
        console.log(user);
        console.log('running set user');
        return this.http.post(this.signupUrl, JSON.stringify(user), {headers: this.headers,responseType: 'text'}); // ...using post request
        // .catch(this.handleError); //...errors if any
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