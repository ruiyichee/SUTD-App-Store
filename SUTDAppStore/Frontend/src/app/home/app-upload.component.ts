import { App } from './../models/app.model';
import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
    selector: 'app-upload-component',
    templateUrl: 'app-upload.component.html',
    styleUrls: ['app-upload.component.scss']
})
export class AppUploadComponent implements OnInit {
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
        console.log('attempting post request');
    }

}