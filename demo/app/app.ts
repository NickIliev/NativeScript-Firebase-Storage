
import * as application from "tns-core-modules/application";
import * as firebase from "nativescript-plugin-firebase";
import { APPSPOT_BUCKET_URL } from "./shared/link";

firebase.init({
    storageBucket: APPSPOT_BUCKET_URL
    // any other options
}).then(() => {
    console.log("Firebase init!");
})

application.run({ moduleName: "app-root" });
/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
