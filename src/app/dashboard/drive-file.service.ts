
export interface DriveFile {
  	name?: string;
  	size?: number;
    kind?: string;
    mimeType?: string;
}

export class DriveFileService {

	driveFiles: DriveFile[] = [];
    

	getDriveFiles() {

	return	gapi.client.drive.files.list({
        	'pageSize': 10,
        	'fields': "nextPageToken, files(id, name, size, kind, mimeType)"
    	}).then((res) => {
        	let files: File[] = res.result.files;
        	console.log("Arpita: num files: " + files.length)
        	let i : number = 0;
        	for (i = 0; i < files.length && i < 100; i++) {
        		console.log("Arpita: name: " + files[i].name);
        		this.driveFiles[i] = {
        			name: files[i].name, 
        			size: files[i].size,
                    kind: files[i].kind,
                    mimeType: files[i].mimeType
        		};
        	
        	}

        	return this.driveFiles;
        });
	}
}