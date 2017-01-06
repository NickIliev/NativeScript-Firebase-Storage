import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { StorageModel } from './main-view-model';

var permissions = require("nativescript-permissions");

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;

    page.bindingContext = new StorageModel();

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
