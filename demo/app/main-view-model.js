"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nativescript_plugin_firebase_1 = require("nativescript-plugin-firebase");
var observable_1 = require("tns-core-modules/data/observable");
var file_system_1 = require("tns-core-modules/file-system");
var link_1 = require("./shared/link");
var StorageModel = /** @class */ (function (_super) {
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
        var appPath = file_system_1.knownFolders.currentApp().path;
        // determine the path to a file in the app/res folder
        var logoPath = appPath + "/images/logo.png";
        // now upload the file with either of the options below:
        nativescript_plugin_firebase_1.storage.uploadFile({
            // optional, can also be passed during init() as 'storageBucket' param so we can cache it (find it in the Firebase console)
            bucket: link_1.APPSPOT_BUCKET_URL,
            // the full path of the file in your Firebase storage (folders will be created)
            remoteFullPath: 'uploads/images/logo-uploaded.png',
            // option 1: a file-system module File object
            localFile: file_system_1.File.fromPath(logoPath),
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
        var documents = file_system_1.knownFolders.documents();
        var logoPath = androidDownloadsPath + "/logo-downloaded.png";
        console.log("logoPath: " + logoPath);
        // this will create or overwrite a local file in the app's documents folder
        var localLogoFile = documents.getFile("logo-downloaded.png");
        // now download the file with either of the options below:
        nativescript_plugin_firebase_1.storage.downloadFile({
            // optional, can also be passed during init() as 'storageBucket' param so we can cache it
            bucket: link_1.APPSPOT_BUCKET_URL,
            // the full path of an existing file in your Firebase storage
            remoteFullPath: 'uploads/images/logo-uploaded.png',
            // option 1: a file-system module File object
            localFile: file_system_1.File.fromPath(logoPath),
            // option 2: a full file path (ignored if 'localFile' is set)
            localFullPath: logoPath
        }).then(function (uploadedFile) {
            console.log("File downloaded to the requested location");
            _this.message = logoPath;
        }).catch(function (err) {
            console.log("File download error: " + err);
        });
    };
    StorageModel.prototype.getFownloadUrl = function () {
        var _this = this;
        nativescript_plugin_firebase_1.storage.getDownloadUrl({
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
        nativescript_plugin_firebase_1.storage.deleteFile({
            // optional, can also be passed during init() as 'storageBucket' param so we can cache it
            bucket: link_1.APPSPOT_BUCKET_URL,
            // the full path of an existing file in your Firebase storage
            remoteFullPath: 'uploads/images/logo-uploaded.png'
        }).then(function () {
            console.log("File deleted from Firebase Storage.");
            _this.message = "File deleted from Firebase Storage.";
        }).catch(function (error) {
            console.log("File deletion Error: " + error);
        });
    };
    return StorageModel;
}(observable_1.Observable));
exports.StorageModel = StorageModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkVBQXVEO0FBQ3ZELCtEQUE4RDtBQUM5RCw0REFBa0U7QUFDbEUsc0NBQW1EO0FBRW5EO0lBQWtDLGdDQUFVO0lBQTVDO1FBQUEscUVBa0dDO1FBaEdXLGNBQVEsR0FBVyxFQUFFLENBQUM7O0lBZ0dsQyxDQUFDO0lBOUZHLHNCQUFXLGlDQUFPO2FBQWxCO1lBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7YUFFRCxVQUFtQixLQUFhO1lBQzVCLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxLQUFLLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2dCQUN0QixJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQy9DO1FBQ0wsQ0FBQzs7O09BUEE7SUFTTSxpQ0FBVSxHQUFqQjtRQUFBLGlCQTBCQztRQXpCRyxJQUFNLE9BQU8sR0FBRywwQkFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQztRQUMvQyxxREFBcUQ7UUFDckQsSUFBTSxRQUFRLEdBQUcsT0FBTyxHQUFHLGtCQUFrQixDQUFDO1FBRTlDLHdEQUF3RDtRQUN4RCxzQ0FBTyxDQUFDLFVBQVUsQ0FBQztZQUNmLDJIQUEySDtZQUMzSCxNQUFNLEVBQUUseUJBQWtCO1lBQzFCLCtFQUErRTtZQUMvRSxjQUFjLEVBQUUsa0NBQWtDO1lBQ2xELDZDQUE2QztZQUM3QyxTQUFTLEVBQUUsa0JBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1lBQ2xDLDZEQUE2RDtZQUM3RCxhQUFhLEVBQUUsUUFBUTtZQUN2Qix1Q0FBdUM7WUFDdkMsVUFBVSxFQUFFLFVBQUEsTUFBTTtnQkFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixHQUFH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QUksQ0FBQyxPQUFPLEdBQUcscUNBQXFDLENBQUM7UUFDekQsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsS0FBSztZQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDakQsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQUFDLEFBbEdELENBQWtDLHVCQUFVLEdBa0czQztBQWxHWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlJztcbmltcG9ydCB7IEZpbGUsIGtub3duRm9sZGVycyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ZpbGUtc3lzdGVtXCI7XG5pbXBvcnQgeyBBUFBTUE9UX0JVQ0tFVF9VUkwgfSBmcm9tIFwiLi9zaGFyZWQvbGlua1wiO1xuXG5leHBvcnQgY2xhc3MgU3RvcmFnZU1vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XG5cbiAgICBwcml2YXRlIF9tZXNzYWdlOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgcHVibGljIGdldCBtZXNzYWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVzc2FnZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IG1lc3NhZ2UodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5tZXNzYWdlICE9IHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9tZXNzYWdlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeVByb3BlcnR5Q2hhbmdlKFwibWVzc2FnZVwiLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgdXBsb2FkRmlsZSgpIHtcbiAgICAgICAgY29uc3QgYXBwUGF0aCA9IGtub3duRm9sZGVycy5jdXJyZW50QXBwKCkucGF0aDtcbiAgICAgICAgLy8gZGV0ZXJtaW5lIHRoZSBwYXRoIHRvIGEgZmlsZSBpbiB0aGUgYXBwL3JlcyBmb2xkZXJcbiAgICAgICAgY29uc3QgbG9nb1BhdGggPSBhcHBQYXRoICsgXCIvaW1hZ2VzL2xvZ28ucG5nXCI7XG5cbiAgICAgICAgLy8gbm93IHVwbG9hZCB0aGUgZmlsZSB3aXRoIGVpdGhlciBvZiB0aGUgb3B0aW9ucyBiZWxvdzpcbiAgICAgICAgc3RvcmFnZS51cGxvYWRGaWxlKHtcbiAgICAgICAgICAgIC8vIG9wdGlvbmFsLCBjYW4gYWxzbyBiZSBwYXNzZWQgZHVyaW5nIGluaXQoKSBhcyAnc3RvcmFnZUJ1Y2tldCcgcGFyYW0gc28gd2UgY2FuIGNhY2hlIGl0IChmaW5kIGl0IGluIHRoZSBGaXJlYmFzZSBjb25zb2xlKVxuICAgICAgICAgICAgYnVja2V0OiBBUFBTUE9UX0JVQ0tFVF9VUkwsXG4gICAgICAgICAgICAvLyB0aGUgZnVsbCBwYXRoIG9mIHRoZSBmaWxlIGluIHlvdXIgRmlyZWJhc2Ugc3RvcmFnZSAoZm9sZGVycyB3aWxsIGJlIGNyZWF0ZWQpXG4gICAgICAgICAgICByZW1vdGVGdWxsUGF0aDogJ3VwbG9hZHMvaW1hZ2VzL2xvZ28tdXBsb2FkZWQucG5nJyxcbiAgICAgICAgICAgIC8vIG9wdGlvbiAxOiBhIGZpbGUtc3lzdGVtIG1vZHVsZSBGaWxlIG9iamVjdFxuICAgICAgICAgICAgbG9jYWxGaWxlOiBGaWxlLmZyb21QYXRoKGxvZ29QYXRoKSxcbiAgICAgICAgICAgIC8vIG9wdGlvbiAyOiBhIGZ1bGwgZmlsZSBwYXRoIChpZ25vcmVkIGlmICdsb2NhbEZpbGUnIGlzIHNldClcbiAgICAgICAgICAgIGxvY2FsRnVsbFBhdGg6IGxvZ29QYXRoLFxuICAgICAgICAgICAgLy8gZ2V0IG5vdGlmaWVkIG9mIGZpbGUgdXBsb2FkIHByb2dyZXNzXG4gICAgICAgICAgICBvblByb2dyZXNzOiBzdGF0dXMgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBsb2FkZWQgZnJhY3Rpb246IFwiICsgc3RhdHVzLmZyYWN0aW9uQ29tcGxldGVkKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBlcmNlbnRhZ2UgY29tcGxldGU6IFwiICsgc3RhdHVzLnBlcmNlbnRhZ2VDb21wbGV0ZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKHVwbG9hZGVkRmlsZSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZpbGUgdXBsb2FkZWQ6IFwiICsgSlNPTi5zdHJpbmdpZnkodXBsb2FkZWRGaWxlKSk7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSBcIkZpbGUgdXBsb2FkZWQ6IFwiICsgSlNPTi5zdHJpbmdpZnkodXBsb2FkZWRGaWxlKTtcbiAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHVibGljIGRvd25sb2FkRmlsZSgpIHtcbiAgICAgICAgY29uc3QgYW5kcm9pZERvd25sb2Fkc1BhdGggPSBhbmRyb2lkLm9zLkVudmlyb25tZW50LmdldEV4dGVybmFsU3RvcmFnZVB1YmxpY0RpcmVjdG9yeShcbiAgICAgICAgICAgIGFuZHJvaWQub3MuRW52aXJvbm1lbnQuRElSRUNUT1JZX0RPV05MT0FEUykudG9TdHJpbmcoKTtcblxuICAgICAgICBjb25zdCBkb2N1bWVudHMgPSBrbm93bkZvbGRlcnMuZG9jdW1lbnRzKCk7XG4gICAgICAgIGNvbnN0IGxvZ29QYXRoID0gYW5kcm9pZERvd25sb2Fkc1BhdGggKyBcIi9sb2dvLWRvd25sb2FkZWQucG5nXCI7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibG9nb1BhdGg6IFwiICsgbG9nb1BhdGgpXG4gICAgICAgIC8vIHRoaXMgd2lsbCBjcmVhdGUgb3Igb3ZlcndyaXRlIGEgbG9jYWwgZmlsZSBpbiB0aGUgYXBwJ3MgZG9jdW1lbnRzIGZvbGRlclxuICAgICAgICBsZXQgbG9jYWxMb2dvRmlsZSA9IGRvY3VtZW50cy5nZXRGaWxlKFwibG9nby1kb3dubG9hZGVkLnBuZ1wiKTtcblxuICAgICAgICAvLyBub3cgZG93bmxvYWQgdGhlIGZpbGUgd2l0aCBlaXRoZXIgb2YgdGhlIG9wdGlvbnMgYmVsb3c6XG4gICAgICAgIHN0b3JhZ2UuZG93bmxvYWRGaWxlKHtcbiAgICAgICAgICAgIC8vIG9wdGlvbmFsLCBjYW4gYWxzbyBiZSBwYXNzZWQgZHVyaW5nIGluaXQoKSBhcyAnc3RvcmFnZUJ1Y2tldCcgcGFyYW0gc28gd2UgY2FuIGNhY2hlIGl0XG4gICAgICAgICAgICBidWNrZXQ6IEFQUFNQT1RfQlVDS0VUX1VSTCxcbiAgICAgICAgICAgIC8vIHRoZSBmdWxsIHBhdGggb2YgYW4gZXhpc3RpbmcgZmlsZSBpbiB5b3VyIEZpcmViYXNlIHN0b3JhZ2VcbiAgICAgICAgICAgIHJlbW90ZUZ1bGxQYXRoOiAndXBsb2Fkcy9pbWFnZXMvbG9nby11cGxvYWRlZC5wbmcnLFxuICAgICAgICAgICAgLy8gb3B0aW9uIDE6IGEgZmlsZS1zeXN0ZW0gbW9kdWxlIEZpbGUgb2JqZWN0XG4gICAgICAgICAgICBsb2NhbEZpbGU6IEZpbGUuZnJvbVBhdGgobG9nb1BhdGgpLFxuICAgICAgICAgICAgLy8gb3B0aW9uIDI6IGEgZnVsbCBmaWxlIHBhdGggKGlnbm9yZWQgaWYgJ2xvY2FsRmlsZScgaXMgc2V0KVxuICAgICAgICAgICAgbG9jYWxGdWxsUGF0aDogbG9nb1BhdGhcbiAgICAgICAgfSkudGhlbih1cGxvYWRlZEZpbGUgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJGaWxlIGRvd25sb2FkZWQgdG8gdGhlIHJlcXVlc3RlZCBsb2NhdGlvblwiKTtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IGxvZ29QYXRoO1xuICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJGaWxlIGRvd25sb2FkIGVycm9yOiBcIiArIGVycik7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHVibGljIGdldEZvd25sb2FkVXJsKCkge1xuICAgICAgICBzdG9yYWdlLmdldERvd25sb2FkVXJsKHtcbiAgICAgICAgICAgIC8vIG9wdGlvbmFsLCBjYW4gYWxzbyBiZSBwYXNzZWQgZHVyaW5nIGluaXQoKSBhcyAnc3RvcmFnZUJ1Y2tldCcgcGFyYW0gc28gd2UgY2FuIGNhY2hlIGl0XG4gICAgICAgICAgICBidWNrZXQ6IEFQUFNQT1RfQlVDS0VUX1VSTCxcbiAgICAgICAgICAgIC8vIHRoZSBmdWxsIHBhdGggb2YgYW4gZXhpc3RpbmcgZmlsZSBpbiB5b3VyIEZpcmViYXNlIHN0b3JhZ2VcbiAgICAgICAgICAgIHJlbW90ZUZ1bGxQYXRoOiAndXBsb2Fkcy9pbWFnZXMvbG9nby11cGxvYWRlZC5wbmcnXG4gICAgICAgIH0pLnRoZW4odXJsID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVtb3RlIFVSTDogXCIgKyB1cmwpO1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gXCJSZW1vdGUgVVJMOiBcIiArIHVybDtcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcik7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHVibGljIGRlbGV0ZUZpbGUoKSB7XG4gICAgICAgIHN0b3JhZ2UuZGVsZXRlRmlsZSh7XG4gICAgICAgICAgICAvLyBvcHRpb25hbCwgY2FuIGFsc28gYmUgcGFzc2VkIGR1cmluZyBpbml0KCkgYXMgJ3N0b3JhZ2VCdWNrZXQnIHBhcmFtIHNvIHdlIGNhbiBjYWNoZSBpdFxuICAgICAgICAgICAgYnVja2V0OiBBUFBTUE9UX0JVQ0tFVF9VUkwsXG4gICAgICAgICAgICAvLyB0aGUgZnVsbCBwYXRoIG9mIGFuIGV4aXN0aW5nIGZpbGUgaW4geW91ciBGaXJlYmFzZSBzdG9yYWdlXG4gICAgICAgICAgICByZW1vdGVGdWxsUGF0aDogJ3VwbG9hZHMvaW1hZ2VzL2xvZ28tdXBsb2FkZWQucG5nJ1xuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlsZSBkZWxldGVkIGZyb20gRmlyZWJhc2UgU3RvcmFnZS5cIik7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSBcIkZpbGUgZGVsZXRlZCBmcm9tIEZpcmViYXNlIFN0b3JhZ2UuXCI7XG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlsZSBkZWxldGlvbiBFcnJvcjogXCIgKyBlcnJvcik7XG4gICAgICAgIH0pXG4gICAgfVxufVxuIl19