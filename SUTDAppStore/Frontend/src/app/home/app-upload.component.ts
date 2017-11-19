import { App } from './../models/app.model';
import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
// import { HttpHeaders } from '@angular/common/http/src/headers';
import { Headers } from '@angular/http';
@Component({
    selector: 'app-upload-component',
    templateUrl: 'app-upload.component.html',
    styleUrls: ['app-upload.component.scss']
})
export class AppUploadComponent implements OnInit {
    genres = ['2D', '3D'];
    // enteredAppName = '';
    // enteredGenre = '';
    // enteredDescription = '';
    appUploadURL = 'http://localhost:8000/appstore/';
    enteredApp = new App();
    headers = new Headers({
        'Content-Type': 'application/json'
      });
    constructor(
        public dialogRef: MatDialogRef<AppUploadComponent>,
        private http: Http,
    ) { }

    ngOnInit() {
    }

    closeDialog() {
        this.dialogRef.close();
    }

    upload() {
        console.log(this.enteredApp.app_name);
        console.log(this.enteredApp.genre);
        console.log(this.enteredApp.description);
        console.log(this.enteredApp);
        console.log('attempting post request');
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.post(this.appUploadURL, JSON.stringify(this.enteredApp), {headers: this.headers}).toPromise().then((res) => {
            
            console.log(res);
            // check if it succeeded
            if (res.status === 200) {
                this.dialogRef.close();            
            }
        });
    }
    autocomplete() {
        this.enteredApp.app_name = 'Test';
        this.enteredApp.genre = '2D';
        this.enteredApp.description = 'Description here';
    }

}