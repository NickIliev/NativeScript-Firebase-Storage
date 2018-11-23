import { requestPermission } from "nativescript-permissions";
import { EventData } from 'tns-core-modules/data/observable';
import { Page } from 'tns-core-modules/ui/page';
import { StorageModel } from './main-view-model';
import { getFrameById } from "tns-core-modules/ui/frame";

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
    let vm = new StorageModel();
    page.bindingContext = vm;

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


export function nav() {
    let frame = getFrameById("my-frame");

    frame.navigate("sub-page");
}