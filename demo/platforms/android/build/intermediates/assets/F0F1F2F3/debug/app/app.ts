import "./bundle-config";
import * as app from 'application';
import * as firebase from "nativescript-plugin-firebase";
import { APPSPOT_BUCKET_URL } from "./shared/link";

firebase.init({
    storageBucket: 'gs://fir-storage-b55dc.appspot.com'
    // any other options
}).then(() => {
    console.log("Firebase init!");
})

app.start({ moduleName: 'main-page' });
