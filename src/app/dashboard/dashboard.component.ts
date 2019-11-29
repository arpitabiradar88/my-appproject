import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { DriveFile, DriveFileService } from './drive-file.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

	dashboardFiles: DriveFile[] = [];

	constructor(private driveFileService: DriveFileService,
              private route: ActivatedRoute,
              private router: Router) {
		//this.dashboardFiles = new Array(100);
  }


ngOnInit() {
console.log("Arpita: in dash comp");

	this.route.data
      .subscribe(
        (data: Data) => {
          this.dashboardFiles = data['fileData'];
        }
      );


    console.log("Arpita: returning from dash comp");
    
    
}

public signOut() {
    gapi.auth2.getAuthInstance().signOut();
    //this.ngZone.run(() => {this.router.navigate(['/signin']) });
  }
  	
}