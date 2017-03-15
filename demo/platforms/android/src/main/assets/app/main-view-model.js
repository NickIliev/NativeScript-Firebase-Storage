"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var firebase = require("nativescript-plugin-firebase");
var fs = require("file-system");
var link_1 = require("./shared/link");
var StorageModel = (function (_super) {
    __extends(StorageModel, _super);
    function StorageModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTZDO0FBQzdDLHVEQUF5RDtBQUN6RCxnQ0FBa0M7QUFDbEMsc0NBQW1EO0FBRW5EO0lBQWtDLGdDQUFVO0lBQTVDO1FBQUEscUVBb0dDO1FBbEdXLGNBQVEsR0FBVyxFQUFFLENBQUM7O0lBa0dsQyxDQUFDO0lBaEdHLHNCQUFXLGlDQUFPO2FBQWxCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQzthQUVELFVBQW1CLEtBQWE7WUFDNUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztnQkFDdEIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNoRCxDQUFDO1FBQ0wsQ0FBQzs7O09BUEE7SUFTTSxpQ0FBVSxHQUFqQjtRQUFBLGlCQTJCQztRQTFCRyxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQztRQUNoRCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JCLHFEQUFxRDtRQUNyRCxJQUFJLFFBQVEsR0FBRyxPQUFPLEdBQUcsa0JBQWtCLENBQUM7UUFFNUMsd0RBQXdEO1FBQ3hELFFBQVEsQ0FBQyxVQUFVLENBQUM7WUFDaEIsMkhBQTJIO1lBQzNILE1BQU0sRUFBRSx5QkFBa0I7WUFDMUIsK0VBQStFO1lBQy9FLGNBQWMsRUFBRSxrQ0FBa0M7WUFDbEQsNkNBQTZDO1lBQzdDLFNBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7WUFDckMsNkRBQTZEO1lBQzdELGFB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QUFrQjtZQUMxQiw2REFBNkQ7WUFDN0QsY0FBYyxFQUFFLGtDQUFrQztTQUNyRCxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUM3QixLQUFJLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxLQUFLO1lBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUNqRCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFDTCxtQkFBQztBQUFELENBQUMsQUFwR0QsQ0FBa0MsdUJBQVUsR0FvRzNDO0FBcEdZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZSc7XG5pbXBvcnQgKiBhcyBmaXJlYmFzZSBmcm9tIFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiO1xuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZpbGUtc3lzdGVtXCI7XG5pbXBvcnQgeyBBUFBTUE9UX0JVQ0tFVF9VUkwgfSBmcm9tIFwiLi9zaGFyZWQvbGlua1wiO1xuXG5leHBvcnQgY2xhc3MgU3RvcmFnZU1vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XG5cbiAgICBwcml2YXRlIF9tZXNzYWdlOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgcHVibGljIGdldCBtZXNzYWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVzc2FnZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IG1lc3NhZ2UodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5tZXNzYWdlICE9IHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9tZXNzYWdlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeVByb3BlcnR5Q2hhbmdlKFwibWVzc2FnZVwiLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgdXBsb2FkRmlsZSgpIHtcbiAgICAgICAgdmFyIGFwcFBhdGggPSBmcy5rbm93bkZvbGRlcnMuY3VycmVudEFwcCgpLnBhdGg7XG4gICAgICAgIGNvbnNvbGUubG9nKGFwcFBhdGgpO1xuICAgICAgICAvLyBkZXRlcm1pbmUgdGhlIHBhdGggdG8gYSBmaWxlIGluIHRoZSBhcHAvcmVzIGZvbGRlclxuICAgICAgICB2YXIgbG9nb1BhdGggPSBhcHBQYXRoICsgXCIvaW1hZ2VzL2xvZ28ucG5nXCI7XG5cbiAgICAgICAgLy8gbm93IHVwbG9hZCB0aGUgZmlsZSB3aXRoIGVpdGhlciBvZiB0aGUgb3B0aW9ucyBiZWxvdzpcbiAgICAgICAgZmlyZWJhc2UudXBsb2FkRmlsZSh7XG4gICAgICAgICAgICAvLyBvcHRpb25hbCwgY2FuIGFsc28gYmUgcGFzc2VkIGR1cmluZyBpbml0KCkgYXMgJ3N0b3JhZ2VCdWNrZXQnIHBhcmFtIHNvIHdlIGNhbiBjYWNoZSBpdCAoZmluZCBpdCBpbiB0aGUgRmlyZWJhc2UgY29uc29sZSlcbiAgICAgICAgICAgIGJ1Y2tldDogQVBQU1BPVF9CVUNLRVRfVVJMLFxuICAgICAgICAgICAgLy8gdGhlIGZ1bGwgcGF0aCBvZiB0aGUgZmlsZSBpbiB5b3VyIEZpcmViYXNlIHN0b3JhZ2UgKGZvbGRlcnMgd2lsbCBiZSBjcmVhdGVkKVxuICAgICAgICAgICAgcmVtb3RlRnVsbFBhdGg6ICd1cGxvYWRzL2ltYWdlcy9sb2dvLXVwbG9hZGVkLnBuZycsXG4gICAgICAgICAgICAvLyBvcHRpb24gMTogYSBmaWxlLXN5c3RlbSBtb2R1bGUgRmlsZSBvYmplY3RcbiAgICAgICAgICAgIGxvY2FsRmlsZTogZnMuRmlsZS5mcm9tUGF0aChsb2dvUGF0aCksXG4gICAgICAgICAgICAvLyBvcHRpb24gMjogYSBmdWxsIGZpbGUgcGF0aCAoaWdub3JlZCBpZiAnbG9jYWxGaWxlJyBpcyBzZXQpXG4gICAgICAgICAgICBsb2NhbEZ1bGxQYXRoOiBsb2dvUGF0aCxcbiAgICAgICAgICAgIC8vIGdldCBub3RpZmllZCBvZiBmaWxlIHVwbG9hZCBwcm9ncmVzc1xuICAgICAgICAgICAgb25Qcm9ncmVzczogc3RhdHVzID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVwbG9hZGVkIGZyYWN0aW9uOiBcIiArIHN0YXR1cy5mcmFjdGlvbkNvbXBsZXRlZCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQZXJjZW50YWdlIGNvbXBsZXRlOiBcIiArIHN0YXR1cy5wZXJjZW50YWdlQ29tcGxldGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkudGhlbih1cGxvYWRlZEZpbGUgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJGaWxlIHVwbG9hZGVkOiBcIiArIEpTT04uc3RyaW5naWZ5KHVwbG9hZGVkRmlsZSkpO1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gXCJGaWxlIHVwbG9hZGVkOiBcIiArIEpTT04uc3RyaW5naWZ5KHVwbG9hZGVkRmlsZSk7XG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHB1YmxpYyBkb3dubG9hZEZpbGUoKSB7XG5cbiAgICAgICAgdmFyIGFuZHJvaWREb3dubG9hZHNQYXRoID0gYW5kcm9pZC5vcy5FbnZpcm9ubWVudC5nZXRFeHRlcm5hbFN0b3JhZ2VQdWJsaWNEaXJlY3RvcnkoXG4gICAgICAgICAgICBhbmRyb2lkLm9zLkVudmlyb25tZW50LkRJUkVDVE9SWV9ET1dOTE9BRFMpLnRvU3RyaW5nKCk7XG5cbiAgICAgICAgdmFyIGRvY3VtZW50cyA9IGZzLmtub3duRm9sZGVycy5kb2N1bWVudHMoKTtcbiAgICAgICAgdmFyIGxvZ29QYXRoID0gYW5kcm9pZERvd25sb2Fkc1BhdGggKyBcIi9sb2dvLWRvd25sb2FkZWQucG5nXCI7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibG9nb1BhdGg6IFwiICsgbG9nb1BhdGgpXG4gICAgICAgIC8vIHRoaXMgd2lsbCBjcmVhdGUgb3Igb3ZlcndyaXRlIGEgbG9jYWwgZmlsZSBpbiB0aGUgYXBwJ3MgZG9jdW1lbnRzIGZvbGRlclxuICAgICAgICB2YXIgbG9jYWxMb2dvRmlsZSA9IGRvY3VtZW50cy5nZXRGaWxlKFwibG9nby1kb3dubG9hZGVkLnBuZ1wiKTtcblxuICAgICAgICAvLyBub3cgZG93bmxvYWQgdGhlIGZpbGUgd2l0aCBlaXRoZXIgb2YgdGhlIG9wdGlvbnMgYmVsb3c6XG4gICAgICAgIGZpcmViYXNlLmRvd25sb2FkRmlsZSh7XG4gICAgICAgICAgICAvLyBvcHRpb25hbCwgY2FuIGFsc28gYmUgcGFzc2VkIGR1cmluZyBpbml0KCkgYXMgJ3N0b3JhZ2VCdWNrZXQnIHBhcmFtIHNvIHdlIGNhbiBjYWNoZSBpdFxuICAgICAgICAgICAgYnVja2V0OiBBUFBTUE9UX0JVQ0tFVF9VUkwsXG4gICAgICAgICAgICAvLyB0aGUgZnVsbCBwYXRoIG9mIGFuIGV4aXN0aW5nIGZpbGUgaW4geW91ciBGaXJlYmFzZSBzdG9yYWdlXG4gICAgICAgICAgICByZW1vdGVGdWxsUGF0aDogJ3VwbG9hZHMvaW1hZ2VzL2xvZ28tdXBsb2FkZWQucG5nJyxcbiAgICAgICAgICAgIC8vIG9wdGlvbiAxOiBhIGZpbGUtc3lzdGVtIG1vZHVsZSBGaWxlIG9iamVjdFxuICAgICAgICAgICAgbG9jYWxGaWxlOiBmcy5GaWxlLmZyb21QYXRoKGxvZ29QYXRoKSxcbiAgICAgICAgICAgIC8vIG9wdGlvbiAyOiBhIGZ1bGwgZmlsZSBwYXRoIChpZ25vcmVkIGlmICdsb2NhbEZpbGUnIGlzIHNldClcbiAgICAgICAgICAgIGxvY2FsRnVsbFBhdGg6IGxvZ29QYXRoXG4gICAgICAgIH0pLnRoZW4odXBsb2FkZWRGaWxlID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlsZSBkb3dubG9hZGVkIHRvIHRoZSByZXF1ZXN0ZWQgbG9jYXRpb25cIik7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSBcIkZpbGUgZG93bmxvYWRlZCBpbiBcIiArIGxvZ29QYXRoO1xuICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJGaWxlIGRvd25sb2FkIGVycm9yOiBcIiArIGVycik7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHVibGljIGdldEZvd25sb2FkVXJsKCkge1xuICAgICAgICBmaXJlYmFzZS5nZXREb3dubG9hZFVybCh7XG4gICAgICAgICAgICAvLyBvcHRpb25hbCwgY2FuIGFsc28gYmUgcGFzc2VkIGR1cmluZyBpbml0KCkgYXMgJ3N0b3JhZ2VCdWNrZXQnIHBhcmFtIHNvIHdlIGNhbiBjYWNoZSBpdFxuICAgICAgICAgICAgYnVja2V0OiBBUFBTUE9UX0JVQ0tFVF9VUkwsXG4gICAgICAgICAgICAvLyB0aGUgZnVsbCBwYXRoIG9mIGFuIGV4aXN0aW5nIGZpbGUgaW4geW91ciBGaXJlYmFzZSBzdG9yYWdlXG4gICAgICAgICAgICByZW1vdGVGdWxsUGF0aDogJ3VwbG9hZHMvaW1hZ2VzL2xvZ28tdXBsb2FkZWQucG5nJ1xuICAgICAgICB9KS50aGVuKHVybCA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlbW90ZSBVUkw6IFwiICsgdXJsKTtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IFwiUmVtb3RlIFVSTDogXCIgKyB1cmw7XG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHB1YmxpYyBkZWxldGVGaWxlKCkge1xuICAgICAgICBmaXJlYmFzZS5kZWxldGVGaWxlKHtcbiAgICAgICAgICAgIC8vIG9wdGlvbmFsLCBjYW4gYWxzbyBiZSBwYXNzZWQgZHVyaW5nIGluaXQoKSBhcyAnc3RvcmFnZUJ1Y2tldCcgcGFyYW0gc28gd2UgY2FuIGNhY2hlIGl0XG4gICAgICAgICAgICBidWNrZXQ6IEFQUFNQT1RfQlVDS0VUX1VSTCxcbiAgICAgICAgICAgIC8vIHRoZSBmdWxsIHBhdGggb2YgYW4gZXhpc3RpbmcgZmlsZSBpbiB5b3VyIEZpcmViYXNlIHN0b3JhZ2VcbiAgICAgICAgICAgIHJlbW90ZUZ1bGxQYXRoOiAndXBsb2Fkcy9pbWFnZXMvbG9nby11cGxvYWRlZC5wbmcnXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJGaWxlIGRlbGV0ZWQuXCIpO1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gXCJGaWxlIGRlbGV0ZWQuXCI7XG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlsZSBkZWxldGlvbiBFcnJvcjogXCIgKyBlcnJvcik7XG4gICAgICAgIH0pXG4gICAgfVxufVxuIl19