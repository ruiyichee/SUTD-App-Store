import { SignupComponent } from './login/signup.component';
import { AppService } from './service/app.service';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MatExpansionModule, MatCheckboxModule, MatNativeDateModule, MatDatepickerModule, MatSnackBarModule, MatPaginatorModule, MatTableModule, MatMenuModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatCardModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { AppUploadComponent } from './home/app-upload.component';
import { AppFeedbackComponent } from './home/app-feedback/app-feedback.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgProgressModule } from 'ngx-progressbar';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

//import { AlertComponent } from './_directives/index';
import { AuthGuard } from './guards/logged-in.guard';
//import { AlertService } from './service/index';
import { AuthenticationService } from './service/authentication.service';
import { UserService } from './service/user.service';
import { SignupService } from './service/signup.service';
import { HomeAppDetailsComponent } from './home-app-details/home-app-details.component';
import { RecommendedAppsComponent } from './recommended-apps/recommended-apps.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'app-details', component: HomeAppDetailsComponent},
  // { path: 'recommended-apps', component: RecommendedAppsComponent},  
];

@NgModule({
  entryComponents: [
    AppUploadComponent,
    AppFeedbackComponent,
    SignupComponent
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserProfileComponent,
    PurchaseComponent,
    AppUploadComponent,
    AppFeedbackComponent,
    SignupComponent,
    NavbarComponent,
    HomeAppDetailsComponent,
    RecommendedAppsComponent
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
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatExpansionModule,
    NgProgressModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [Title,
    UserService,
    AuthenticationService,
    AppService,
    SignupService,
    AuthGuard, {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
