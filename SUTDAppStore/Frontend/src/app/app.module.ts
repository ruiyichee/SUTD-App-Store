import { AdminService } from './service/admin.service';
import { SignupComponent } from './login/signup.component';
import { AppService } from './service/app.service';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MatSliderModule, MatTabsModule, MatCheckboxModule, MatNativeDateModule, MatDatepickerModule, MatSnackBarModule, MatPaginatorModule, MatTableModule, MatMenuModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatCardModule, MatDialogModule } from '@angular/material';
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

import { AuthGuard } from './guards/logged-in.guard';
import { AuthenticationService } from './service/authentication.service';
import { UserService } from './service/user.service';
import { SignupService } from './service/signup.service';
import { HomeAppDetailsComponent } from './home-app-details/home-app-details.component';
import { RecommendedAppsComponent } from './recommended-apps/recommended-apps.component';
import { SalesComponent } from './sales/sales.component';
import { ChartsModule } from 'ng2-charts';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'app-details', component: HomeAppDetailsComponent},
  { path: 'sales', component: SalesComponent},  
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
    RecommendedAppsComponent,
    SalesComponent
  ],
  imports: [
    ChartsModule,
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
    MatSliderModule,
    MatTabsModule,
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
    AdminService,
    AuthGuard, {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
