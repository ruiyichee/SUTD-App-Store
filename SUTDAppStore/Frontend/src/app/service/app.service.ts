import { Endorsement } from './../models/endorsement.model';
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
    private toRecommendUrl = 'http://localhost:8000/appstore/recommend/';
    private feedbackUrl = 'http://localhost:8000/appstore/feedback/';
    private feedbackEndorsementUrl = 'http://localhost:8000/appstore/feedback/endorsement/';
    private searchUrl = 'http://localhost:8000/appstore/search/';
    private feedbackSearchUrl = 'http://localhost:8000/appstore/feedback/search/';
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    constructor(private http: HttpClient) { }

    getApps(): Observable<App[]> {
        return this.http.get<App[]>(this.appUrl)
            .do(data => console.log('get success'))
            .catch(this.handleError);
    }

    getRecommendedApps(userID): Observable<App[]> {
        const recommendedAppUrl = this.toRecommendUrl + userID + '/';
        return this.http.get<App[]>(recommendedAppUrl)
            .do(data => console.log('get success'))
            .catch(this.handleError);
    }

    getFeedbacks(appID): Observable<Feedback[]> {
        const appFeedbackUrl = this.feedbackUrl + appID + '/';
        return this.http.get<Feedback[]>(appFeedbackUrl)
            .do(data => console.log('get success'))
            .catch(this.handleError);
    }

    getNumberOfFeedbacks(number, appID, userID): Observable<any[]> {
        const appFeedbackSearchUrl = this.feedbackSearchUrl + number + '/' + appID + '/' + userID + '/';
        console.log(appFeedbackSearchUrl);
        return this.http.get<any[]>(appFeedbackSearchUrl)
            .do(data => console.log('get success'))
            .catch(this.handleError);
    }

    downloadApp(appID, userID): Observable<any> {
        const appDownloadUrl = this.appUrl + appID + '/' + userID + '/';
        console.log(appDownloadUrl);
        return this.http.post(appDownloadUrl, JSON.stringify("Download this app"), { headers: this.headers, responseType: 'text' }) // ...using post request
        .catch(this.handleError); //...errors if any
    }

    getFeedbackEndorsement(appID): Observable<Endorsement[]> {
        const appFeedbackEndorsementUrl = this.feedbackEndorsementUrl + appID + '/';
        return this.http.get<Endorsement[]>(appFeedbackEndorsementUrl)
            .do(data => console.log('get success'))
            .catch(this.handleError);
    }

    setApp(app): Observable<any> {
        return this.http.post(this.appUrl, JSON.stringify(app), { headers: this.headers, responseType: 'text' }) // ...using post request
            .catch(this.handleError); //...errors if any
    }

    setFeedback(feedback, appID): Observable<any> {
        const appFeedbackUrl = this.feedbackUrl + appID + '/';
        return this.http.post(appFeedbackUrl, JSON.stringify(feedback), { headers: this.headers, responseType: 'text' }) // ...using post request
            .catch(this.handleError); //...errors if any
    }

    setFeedbackEndorsement(feedbackEndorsement, appID): Observable<any> {
        const appFeedbacEndorsementUrl = this.feedbackEndorsementUrl + appID + '/';
        return this.http.post(appFeedbacEndorsementUrl, JSON.stringify(feedbackEndorsement), { headers: this.headers, responseType: 'text' }) // ...using post request
            .catch(this.handleError); //...errors if any
    }

    searchApp(searchValue, price_range, genre): Observable<App[]> {
        if (searchValue === 'All' && price_range === 'All' && genre === 'All') {
            return this.http.get<App[]>(this.appUrl)
                .do(data => console.log('get success'))
                .catch(this.handleError);
        } else {
            if (searchValue === '') {
                searchValue = 'All';
            }
            let price_tag = '0';
            if (price_range === '<5') {
                price_tag = '1';
            } 
            else if (price_range === '5 - 10') {
                price_tag = '2';
            }
            else if (price_range === '>10') {
                price_tag = '3';
            }
            const appSearchUrl = this.searchUrl + searchValue + '/' + price_tag + '/' + genre + '/';
            console.log(appSearchUrl);
            return this.http.get<App[]>(appSearchUrl)
                .do(data => console.log('get success'))
                .catch(this.handleError);
        }

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