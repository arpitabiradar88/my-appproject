import { Component, NgZone, OnInit } from '@angular/core';
import { GoogleAuthService } from 'ng-gapi';
import { GoogleApiService } from 'ng-gapi';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-appproject';
  gapi_loaded: boolean = false;

  constructor(private gapiService: GoogleApiService, 
              private router: Router, 
              private ngZone: NgZone) {
     // First make sure gapi is loaded can be in AppInitilizer
     this.gapiService.onLoad().subscribe( () => {
        console.log("Arpita: Loaded gapi");
        gapi.load('client:auth2', () => {
          console.log("Arpita: Loaded gapi...2");
          this.gapi_loaded = true;
          gapi.client.init({
            apiKey: "AIzaSyDruDhzlQWCqctSISg-Zp9NzmJPrLLFtzM",
            clientId: "1049572003810-c3cp4di3opmg6qolno35gm3i58ft5ims.apps.googleusercontent.com",
            discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
            scope: "https://www.googleapis.com/auth/drive.metadata.readonly"
          });
          
          
        });

        

     });
  }



  ngOnInit() {
    console.log("Arpita: in ng init");
    

  }

  signIn() {
    gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
    gapi.auth2.getAuthInstance().signIn({
      prompt: 'consent'
    }).then( () => {
      this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  }

  public updateSigninStatus(isSignedIn) {
    console.log("Arpita: in signin status");
    if (isSignedIn) {
      console.log("Arpita: in signin status: success");
      this.ngZone.run(() => { this.router.navigate(['/dashboard']) });
    }
  }

  isSignedIn() {
    if (this.gapi_loaded) {
        return gapi.auth2.getAuthInstance().isSignedIn.get();
    } else {
      return false;
    }
  }
  
}