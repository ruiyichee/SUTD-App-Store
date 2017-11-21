import { App } from './../models/app.model';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
// import { HttpHeaders } from '@angular/common/http/src/headers';
import { Headers } from '@angular/http';
@Component({
    selector: 'app-upload-component',
    templateUrl: 'app-upload.component.html',
    styleUrls: ['app-upload.component.scss']
})
export class AppUploadComponent implements OnInit {
    @ViewChild('fileInput') fileInput;
    
    genres = ['2D', '3D'];
    appUploadURL = 'http://localhost:8000/appstore/';
    enteredApp = new App();
    headers = new Headers({
        'Content-Type': 'application/json'
      });
    constructor(
        public dialogRef: MatDialogRef<AppUploadComponent>,
        private http: Http,
        public snackBar: MatSnackBar
    ) { }

    ngOnInit() {
    }

    closeDialog() {
        this.dialogRef.close();
    }

    upload() {
        console.log(this.enteredApp);
        console.log('attempting post request');
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.post(this.appUploadURL, JSON.stringify(this.enteredApp), {headers: this.headers}).toPromise().then((res) => {
            
            console.log(res);
            // check if it succeeded
            if (res.status === 200) {
                this.dialogRef.close();  
                this.snackBar.open('Successfully uploaded App', 'OK', {
                    duration: 3000,
                    extraClasses: ['success-snackbar']      
                    
                  });
            } else {
                this.dialogRef.close();                  
                this.snackBar.open('Failed to upload App', 'OK', {
                    duration: 3000,
                    extraClasses: ['failure-snackbar']      
                    
                  });
            }
        });
    }
    autocomplete() {
        this.enteredApp.app_name = 'Test';
        this.enteredApp.genre = '2D';
        this.enteredApp.description = 'Description here';
    }

    private uploadFile() {
        const fileBrowser = this.fileInput.nativeElement;
        if (fileBrowser.files && fileBrowser.files[0]) {
        //   const formData = new FormData();
        //   formData.append('files', fileBrowser.files[0]);
        //   const xhr = new XMLHttpRequest();
        //   xhr.open('POST', '/api/Data/UploadFiles', true);
        //   xhr.onload = function () {
        //     if (this['status'] === 200) {
        //         const responseText = this['responseText'];
        //         const files = JSON.parse(responseText);
        //         //todo: emit event
        //     } else {
        //       //todo: error handling
        //     }
        //   };
        //   xhr.send(formData);
        }
      }

}