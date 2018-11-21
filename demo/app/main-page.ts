import { requestPermission } from "nativescript-permissions";
import { EventData } from 'tns-core-modules/data/observable';
import { Page } from 'tns-core-modules/ui/page';
import { StorageModel } from './main-view-model';

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;

    page.bindingContext = new StorageModel();

    requestPermission([
        "android.permission.INTERNET",
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.WRITE_EXTERNAL_STORAGE"
    ], "I need these permissions")
        .then(() => {
            console.log("Permissions granted!");
        })
        .catch(() => {
            console.log("No permissions - plan B time!");
        });
}
