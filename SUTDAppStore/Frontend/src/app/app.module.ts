import { AppDetailComponent } from './home/app-detail.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MatPaginatorModule, MatTableModule, MatMenuModule , MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatCardModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { AppUploadComponent } from './home/app-upload.component';
import { AppFeedbackComponent } from './home/app-feedback/app-feedback.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user-profile', component: UserProfileComponent },
  
  // { path: 'about', component: AboutComponent },
  // { path: 'contact', component: ContactComponent },
  // { path: 'blog', component: BlogComponent },
  // { path: 'travels',     component: TravelsComponent }
];

@NgModule({
  entryComponents: [
    AppDetailComponent,
    AppUploadComponent,
    AppFeedbackComponent
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserProfileComponent,
    AppDetailComponent,
    PurchaseComponent,
    AppUploadComponent,
    AppFeedbackComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule, 
    MatSelectModule,
    MatCardModule,
    MatDialogModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
