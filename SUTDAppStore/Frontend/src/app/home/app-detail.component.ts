import { App } from './../models/app.model';
import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
    selector: 'app-detail-component',
    templateUrl: 'app-detail.component.html',
    styleUrls: ['app-detail.component.scss']
})
export class AppDetailComponent implements OnInit {

    public selectedApp = new App();
    url: string = 'http://localhost:8000/feedback/';
    feedbacks = [];
    screenshots = [];
    appIcon: string;

    constructor(
        public dialogRef: MatDialogRef<AppDetailComponent>,
        private http: Http,
    ) { }

    ngOnInit(): void {
        // fake description and screenshot and icon
        this.selectedApp.description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin finibus aliquam cursus. Proin non sem rhoncus, pellentesque nisl vel, ornare felis. ';
        this.appIcon = "assets/img/appicon1.svg";
        this.screenshots.push('assets/img/screenshot1.svg');
        this.screenshots.push('assets/img/screenshot1.svg');
        this.screenshots.push('assets/img/screenshot1.svg');
        
        // get feedback
        const appID = this.selectedApp.aid;
        console.log(appID);
        const newURL = this.url + appID + '/'; 
        this.http.get(newURL).toPromise().then((res) => {
            this.feedbacks = [];
            console.log(res.json().length);
            const jsonArray = res.json();
            for (let i = 0; i < jsonArray.length; i++) {
                let localFeedback;
                localFeedback = jsonArray[i];
                this.feedbacks.push(localFeedback)
            }
            console.log(this.feedbacks);
        });
    }

    closeDialog() {
        this.dialogRef.close();
    }

    downloadApp(event) {
        const appID = this.selectedApp.aid;
        console.log(appID);
        const newURL = this.url + appID + '/';        
        const appToBeDownloaded = this.selectedApp;
        // TODO: GET the appfile from DB
        console.log('trying to download app');
        console.log('not done downloading file yet');
        console.log('Increment to DB');
        let incrementor = 1;
        this.http.post(newURL, incrementor).toPromise().then((res) => {
            console.log(res.json());
            console.log('succeeded');
        });
        event.stopPropagation();
    }
}
