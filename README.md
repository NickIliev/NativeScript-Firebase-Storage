# NativeScript-Firebase-Storage

POC nativeScript application using nativescript-plugin-firebase with enabled Firebase Storage.

## Firebase Storage for Android

1. Install nativescript-plugin-firebase
    ```
    tns plugin add nativescript-plugin-firebase
    ``` 
    During the installation enable firebase storage optiion when asked in the pronpts.

2. Log in your Firebase console and create your project. 
    - Generate your `google-services.json` file
    - copy the appspot url (used for your storage looks something like `gs://fir-storage-b55dc.appspot.com`) 

3. Back in your app add Android platform

    ```
    tns plugin add android
    ```

4. Paste the google-serives.json in `platforms/android`

5. In your `app.ts` intialize Firebase providing the appspot url as your storageBucket
    ```
        firebase.init({
            storageBucket: APPSPOT_BUCKET_URL
            // any other options
        });
    ```

6. Upload file
    ```
    public onUpload() {
        var appPath = fs.knownFolders.currentApp().path;

        // determine the path to a file in the app/res folder
        var logoPath = appPath + "/res/logo.png";

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
        });
    }
    ```    

7. Download file
    ```
    var documents = fs.knownFolders.documents();
    var logoPath = documents.path + "/telerik-logo-downloaded.png";

    // this will create or overwrite a local file in the app's documents folder
    var localLogoFile = documents.getFile("telerik-logo-downloaded.png");

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
    }).catch(err => {
        console.log("File download error: " + err);
    })
    ```

8. Get download url
    ```
    firebase.getDownloadUrl({
        // optional, can also be passed during init() as 'storageBucket' param so we can cache it
        bucket: 'gs://n-plugin-test.appspot.com',
        // the full path of an existing file in your Firebase storage
        remoteFullPath: 'uploads/images/logo-uploaded.png'
    }).then(url => {
        console.log("Remote URL: " + url);
    }).catch(error => {
        console.log("Error: " + error);
    })
    ```    

9. Delete file from Firebase strage
    ```
    firebase.deleteFile({
        // optional, can also be passed during init() as 'storageBucket' param so we can cache it
        bucket: APPSPOT_BUCKET_URL,
        // the full path of an existing file in your Firebase storage
        remoteFullPath: 'uploads/images/logo-uploaded.png'
    }).then(() => {
        console.log("File deleted.");
    }).catch(error => {
        console.log("File deletion Error: " + error);
    })
    ```    