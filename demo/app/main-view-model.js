"use strict";
var observable_1 = require("data/observable");
var firebase = require("nativescript-plugin-firebase");
var fs = require("file-system");
var link_1 = require("./shared/link");
var StorageModel = (function (_super) {
    __extends(StorageModel, _super);
    function StorageModel() {
        var _this = _super.apply(this, arguments) || this;
        _this._message = "";
        return _this;
    }
    Object.defineProperty(StorageModel.prototype, "message", {
        get: function () {
            return this._message;
        },
        set: function (value) {
            if (this.message != value) {
                this._message = value;
                this.notifyPropertyChange("message", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    StorageModel.prototype.uploadFile = function () {
        var _this = this;
        var appPath = fs.knownFolders.currentApp().path;
        console.log(appPath);
        // determine the path to a file in the app/res folder
        var logoPath = appPath + "/images/logo.png";
        // now upload the file with either of the options below:
        firebase.uploadFile({
            // optional, can also be passed during init() as 'storageBucket' param so we can cache it (find it in the Firebase console)
            bucket: link_1.APPSPOT_BUCKET_URL,
            // the full path of the file in your Firebase storage (folders will be created)
            remoteFullPath: 'uploads/images/logo-uploaded.png',
            // option 1: a file-system module File object
            localFile: fs.File.fromPath(logoPath),
            // option 2: a full file path (ignored if 'localFile' is set)
            localFullPath: logoPath,
            // get notified of file upload progress
            onProgress: function (status) {
                console.log("Uploaded fraction: " + status.fractionCompleted);
                console.log("Percentage complete: " + status.percentageCompleted);
            }
        }).then(function (uploadedFile) {
            console.log("File uploaded: " + JSON.stringify(uploadedFile));
            _this.message = "File uploaded: " + JSON.stringify(uploadedFile);
        }).catch(function (err) {
            console.log(err);
        });
    };
    StorageModel.prototype.downloadFile = function () {
        var _this = this;
        var androidDownloadsPath = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).toString();
        var documents = fs.knownFolders.documents();
        var logoPath = androidDownloadsPath + "/logo-downloaded.png";
        console.log("logoPath: " + logoPath);
        // this will create or overwrite a local file in the app's documents folder
        var localLogoFile = documents.getFile("logo-downloaded.png");
        // now download the file with either of the options below:
        firebase.downloadFile({
            // optional, can also be passed during init() as 'storageBucket' param so we can cache it
            bucket: link_1.APPSPOT_BUCKET_URL,
            // the full path of an existing file in your Firebase storage
            remoteFullPath: 'uploads/images/logo-uploaded.png',
            // option 1: a file-system module File object
            localFile: fs.File.fromPath(logoPath),
            // option 2: a full file path (ignored if 'localFile' is set)
            localFullPath: logoPath
        }).then(function (uploadedFile) {
            console.log("File downloaded to the requested location");
            _this.message = "File downloaded in " + logoPath;
        }).catch(function (err) {
            console.log("File download error: " + err);
        });
    };
    StorageModel.prototype.getFownloadUrl = function () {
        var _this = this;
        firebase.getDownloadUrl({
            // optional, can also be passed during init() as 'storageBucket' param so we can cache it
            bucket: link_1.APPSPOT_BUCKET_URL,
            // the full path of an existing file in your Firebase storage
            remoteFullPath: 'uploads/images/logo-uploaded.png'
        }).then(function (url) {
            console.log("Remote URL: " + url);
            _this.message = "Remote URL: " + url;
        }).catch(function (error) {
            console.log("Error: " + error);
        });
    };
    StorageModel.prototype.deleteFile = function () {
        var _this = this;
        firebase.deleteFile({
            // optional, can also be passed during init() as 'storageBucket' param so we can cache it
            bucket: link_1.APPSPOT_BUCKET_URL,
            // the full path of an existing file in your Firebase storage
            remoteFullPath: 'uploads/images/logo-uploaded.png'
        }).then(function () {
            console.log("File deleted.");
            _this.message = "File deleted.";
        }).catch(function (error) {
            console.log("File deletion Error: " + error);
        });
    };
    return StorageModel;
}(observable_1.Observable));
exports.StorageModel = StorageModel;
//# sourceMappingURL=main-view-model.js.map