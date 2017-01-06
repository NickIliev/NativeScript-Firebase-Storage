"use strict";
var main_view_model_1 = require("./main-view-model");
var permissions = require("nativescript-permissions");
function navigatingTo(args) {
    var page = args.object;
    page.bindingContext = new main_view_model_1.StorageModel();
    permissions.requestPermission([
        "android.permission.INTERNET",
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.WRITE_EXTERNAL_STORAGE"
    ], "I need these permissions")
        .then(function (res) {
        console.log("Permissions granted!");
    })
        .catch(function () {
        console.log("No permissions - plan B time!");
    });
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map