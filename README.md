# NativeScript-Firebase-Storage

POC nativeScript application using `nativescript-plugin-firebase` with enabled **Firebase Storage**. The demo app demonstrates the basic storage operations for both Android and iOS.

## Enabling Firebase Storage for Android and iOS

1. Install nativescript-plugin-firebase
    ```
    npm i nativescript-plugin-firebase --save
    ``` 
    During the installation **enable** Firebase Storage option when asked in the pronpts.

2. Log in your [Firebase console](https://console.firebase.google.com) and create your projects and then create Android and iOS apps. 
    - Generate your `google-services.json` file (Android app)
    - Generate your `GoogleServices-info.plist` file (iOS app)
    - Copy the appspot url (used for your storage looks something like `gs://fir-storage-b55dc.appspot.com`) 

3. Back in your app add Android platform

    ```
    tns platform add android
    tns platform add ios
    ```

4. Paste the `google-serives.json` in `App_Resources/Android`

5. Paste the `GoogleServices-info.plist` in `platApp_Resourcesforms/iOS`

6. In your `app.ts` intialize Firebase providing the appspot url as your storageBucket
    ```TypeScript
        firebase.init({
            storageBucket: APPSPOT_BUCKET_URL // this is the appsport url copied in step 2
            // any other options follows here
        });
    ```

## Testing Storage Functionalities

### Upload file from Storage

    ```TypeScript
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
    ```    

### Download file from Storage

    ```TypeScript
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
    ```

### Get the download URL

    ```TypeScript
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
    ```    

### Delete file from Firebase strage

    ```TypeScript
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
    ```    