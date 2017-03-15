import { Observable } from 'data/observable';
import * as firebase from "nativescript-plugin-firebase";
import * as fs from "file-system";
import { APPSPOT_BUCKET_URL } from "./shared/link";

export class StorageModel extends Observable {

    private _message: string = "";

    public get message() {
        return this._message;
    }

    public set message(value: string) {
        if (this.message != value) {
            this._message = value;
            this.notifyPropertyChange("message", value);
        }
    }

    public uploadFile() {
        var appPath = fs.knownFolders.currentApp().path;
        console.log(appPath);
        // determine the path to a file in the app/res folder
        var logoPath = appPath + "/images/logo.png";

        // now upload the file with either of the options below:
        firebase.uploadFile({
            // optional, can also be passed during init() as 'storageBucket' param so we can cache it (find it in the Firebase console)
            bucket: APPSPOT_BUCKET_URL,
            // the full path of the file in your Firebase storage (folders will be created)
            remoteFullPath: 'uploads/images/logo-uploaded.png',
            // option 1: a file-system module File object
            localFile: fs.File.fromPath(logoPath),
            // option 2: a full file path (ignored if 'localFile' is set)
            localFullPath: logoPath,
            // get notified of file upload progress
            onProgress: status => {
                console.log("Uploaded fraction: " + status.fractionCompleted);
                console.log("Percentage complete: " + status.percentageCompleted);
            }
        }).then(uploadedFile => {
            console.log("File uploaded: " + JSON.stringify(uploadedFile));
            this.message = "File uploaded: " + JSON.stringify(uploadedFile);
        }).catch(err => {
            console.log(err);
        })
    }

    public downloadFile() {

        var androidDownloadsPath = android.os.Environment.getExternalStoragePublicDirectory(
            android.os.Environment.DIRECTORY_DOWNLOADS).toString();

        var documents = fs.knownFolders.documents();
        var logoPath = androidDownloadsPath + "/logo-downloaded.png";
        console.log("logoPath: " + logoPath)
        // this will create or overwrite a local file in the app's documents folder
        var localLogoFile = documents.getFile("logo-downloaded.png");

        // now download the file with either of the options below:
        firebase.downloadFile({
            // optional, can also be passed during init() as 'storageBucket' param so we can cache it
            bucket: APPSPOT_BUCKET_URL,
            // the full path of an existing file in your Firebase storage
            remoteFullPath: 'uploads/images/logo-uploaded.png',
            // option 1: a file-system module File object
            localFile: fs.File.fromPath(logoPath),
            // option 2: a full file path (ignored if 'localFile' is set)
            localFullPath: logoPath
        }).then(uploadedFile => {
            console.log("File downloaded to the requested location");
            this.message = "File downloaded in " + logoPath;
        }).catch(err => {
            console.log("File download error: " + err);
        })
    }

    public getFownloadUrl() {
        firebase.getDownloadUrl({
            // optional, can also be passed during init() as 'storageBucket' param so we can cache it
            bucket: APPSPOT_BUCKET_URL,
            // the full path of an existing file in your Firebase storage
            remoteFullPath: 'uploads/images/logo-uploaded.png'
        }).then(url => {
            console.log("Remote URL: " + url);
            this.message = "Remote URL: " + url;
        }).catch(error => {
            console.log("Error: " + error);
        })
    }

    public deleteFile() {
        firebase.deleteFile({
            // optional, can also be passed during init() as 'storageBucket' param so we can cache it
            bucket: APPSPOT_BUCKET_URL,
            // the full path of an existing file in your Firebase storage
            remoteFullPath: 'uploads/images/logo-uploaded.png'
        }).then(() => {
            console.log("File deleted.");
            this.message = "File deleted.";
        }).catch(error => {
            console.log("File deletion Error: " + error);
        })
    }
}
