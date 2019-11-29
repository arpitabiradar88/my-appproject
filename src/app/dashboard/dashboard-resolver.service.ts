import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { DriveFile, DriveFileService } from './drive-file.service';


@Injectable()
export class DashboardResolver implements Resolve<DriveFile[]> {
  constructor(private driveFileService: DriveFileService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DriveFile[]> | Promise<DriveFile[]> | DriveFile[] {
    return this.driveFileService.getDriveFiles();
  }
}