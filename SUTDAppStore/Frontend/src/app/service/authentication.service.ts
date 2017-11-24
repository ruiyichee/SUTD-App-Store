import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import decode from 'jwt-decode';
import { AuthConfig, tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthenticationService {
    constructor(
        private http: Http) { }

    login(username: string, password: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log('trying to login from auth service');

        return this.http.post('http://127.0.0.1:8000/rest-auth/login/', JSON.stringify({ username: username, password: password }), options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                let token = user['key'];
                console.log(token);
                console.log(user);
                console.log(user.token);
                if (user) {
                    console.log('logged in');
                    localStorage.setItem('token', token);
                    localStorage.setItem('username', username);
                }
                return user;
            });
    }

    signup(username: string, password1: string, password2: string, email: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log('trying to signup from auth service');
        return this.http.post('http://127.0.0.1:8000/rest-auth/registration/', JSON.stringify({ username: username, password1: password1, password2: password2, email: email }), options)
            .map((response: Response) => {
                return response;
            });
    }

    logout() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        // remove user from local storage to log user out
        return this.http.post('http://127.0.0.1:8000/rest-auth/logout/', JSON.stringify({}), options)
        .map((response: Response) => {
            return response;
        });
        
    }

    public getToken(): string {
        return localStorage.getItem('token');
    }
    public isAuthenticated(): boolean {
        // get the token
        const token = this.getToken();
        // return a boolean reflecting 
        // whether or not the token is expired
        return tokenNotExpired(null, token);
    }
}