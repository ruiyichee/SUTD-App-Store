import { Router } from '@angular/router';
import { User } from './../models/user.model';
import { UserService } from './../service/user.service';
import { AppService } from './../service/app.service';
import { App } from './../models/app.model';
import { Component, OnInit, HostBinding, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { NgProgress } from 'ngx-progressbar';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
    selector: 'download-confirmation',
    templateUrl: './download-confirmation.component.html',
    styleUrls: ['./download-confirmation.component.scss'],

})
export class DownloadConfirmationComponent implements OnInit {
    appName: string;
    // result: string;
    constructor(
        public ngProgress: NgProgress,
        private dialog: MatDialog,
        public dialogRef: MatDialogRef<DownloadConfirmationComponent>,
    ) {
    }
    ngOnInit(): void {
    }
}