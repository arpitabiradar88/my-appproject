import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  GoogleApiModule,
  GoogleApiService,
  GoogleAuthService,
  NgGapiClientConfig,
  NG_GAPI_CONFIG,
  GoogleApiConfig
} from "ng-gapi";
import { AppComponent } from './app.component';
import {Routes, RouterModule} from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardResolver } from './dashboard/dashboard-resolver.service';
import { DriveFile, DriveFileService } from './dashboard/drive-file.service';

let gapiClientConfig: NgGapiClientConfig = {
  client_id: "1049572003810-c3cp4di3opmg6qolno35gm3i58ft5ims.apps.googleusercontent.com",
  discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
  ux_mode: "redirect",
  redirect_uri: "http://localhost:4200",
  scope: [
    "https://www.googleapis.com/auth/drive.metadata.readonly"
  ].join(" ")
};

const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: 'signin', component: AppComponent }, 
  { path: 'dashboard', component: DashboardComponent, resolve: {fileData: DashboardResolver} }
];

@NgModule({
  declarations: [
    AppComponent, 
    DashboardComponent
  ],
  imports:      [ 
    BrowserModule,
    FormsModule,
    HttpClientModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }), 
    RouterModule.forRoot(appRoutes),
    ],
  providers: [DriveFileService, DashboardResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
