import { MatDialogRef } from '@angular/material';
import { Component } from '@angular/core';
import { App } from './app.model';
@Component({
    selector: 'app-detail-component',
    templateUrl: 'app-detail.component.html',
    styleUrls: ['app-detail.component.scss']
})
export class AppDetailComponent {
    public selectedApp = new App();
    // public projectIcon: String;
    constructor(
        public dialogRef: MatDialogRef<AppDetailComponent>,
    ) { }

    closeDialog() {
        this.dialogRef.close();
    }
}
