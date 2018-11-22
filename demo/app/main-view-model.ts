import { storage } from "nativescript-plugin-firebase";
import { Observable } from 'tns-core-modules/data/observable';
import { File, knownFolders, path } from "tns-core-modules/file-system";
import { isAndroid, isIOS } from "tns-core-modules/platform";
import { APPSPOT_BUCKET_URL } from "./shared/link";

export class StorageModel extends Observable {

    private _message: string = "";

    get message() {
        return this._message;
    }

    set message(value: string) {
        if (this.message != value) {
            this._message = value;
            this.notifyPropertyChange("message", value);
        }
    }

    uploadFile() {
        const appPath = knownFolders.currentApp().path;
        // The path to he file  we want to upload (this one is in `app/images`)
        const logoPath = appPath + "/images/firebase-storage.png";

        // Upload the file with the options below:
        storage.uploadFile({
            // optional, can also be passed during init() as 'storageBucket' param so we can cache it (find the URL in the Firebase console)
            bucket: APPSPOT_BUCKET_URL,
            // the full path of the file in your Firebase storage (folders will automatically be created)
            remoteFullPath: 'uploads/images/firebase-storage.png',
            // option 1: a file-system module File object
            localFile: File.fromPath(logoPath),
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

    downloadFile() {
        let downloadPath: string;
        let logoPath: string;
        let fileName: string = "firebase-storage.png";

        if (isAndroid) {
            downloadPath = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).toString();
        } else if (isIOS) {
            downloadPath = knownFolders.documents().path;
        }

        logoPath = path.join(downloadPath, fileName);

        // Download the file with the options below:
        storage.downloadFile({
            // optional, can also be passed during init() as 'storageBucket' param so we can cache it
            bucket: APPSPOT_BUCKET_URL,
            // the full path of an existing file in your Firebase storage
            remoteFullPath: 'uploads/images/firebase-storage.png',
            // option 1: a file-system module File object
            localFile: File.fromPath(logoPath),
            // option 2: a full file path (ignored if 'localFile' is set)
            localFullPath: logoPath
        }).then(uploadedFile => {
            console.log("File downloaded to the requested location");
            console.log("uploadedFile: ", uploadedFile);
            this.message = logoPath;
        }).catch(err => {
            console.log("File download error: " + err);
        })
    }

    getDownloadUrl() {
        storage.getDownloadUrl({
            // optional, can also be passed during init() as 'storageBucket' param so we can cache it
            bucket: APPSPOT_BUCKET_URL,
            // the full path of an existing file in your Firebase storage
            remoteFullPath: 'uploads/images/firebase-storage.png'
        }).then(remoteURL => {
            console.log("Remote URL: " + remoteURL);
            this.message = "Remote URL: " + remoteURL;
        }).catch(error => {
            console.log("Error: " + error);
        })
    }

    deleteFile() {
        storage.deleteFile({
            // optional, can also be passed during init() as 'storageBucket' param so we can cache it
            bucket: APPSPOT_BUCKET_URL,
            // the full path of an existing file in your Firebase storage
            remoteFullPath: 'uploads/images/firebase-storage.png'
        }).then(() => {
            console.log("File deleted from Firebase Storage.");
            this.message = "File deleted from Firebase Storage.";
        }).catch(error => {
            console.log("File deletion Error: " + error);
        })
    }
}
