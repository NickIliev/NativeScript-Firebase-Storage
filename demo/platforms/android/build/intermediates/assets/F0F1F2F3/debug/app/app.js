"use strict";
require("./bundle-config");
var app = require("application");
var firebase = require("nativescript-plugin-firebase");
firebase.init({
    storageBucket: 'gs://fir-storage-b55dc.appspot.com'
}).then(function () {
    console.log("Firebase init!");
});
app.start({ moduleName: 'main-page' });
//# sourceMappingURL=app.js.map