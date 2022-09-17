export class BackgroundMessage {
    constructor(onUpdated, onInstalled, onUninstalled) {

        if (typeof onUpdated !== "object") {
            throw "onUpdated must be a object."
        }

        if (typeof onUpdated.callback !== "function") {
            throw "onUpdated must be a function."
        }

        this.onUpdated = {
            urlMatch: onUpdated.urlMatch,
            callback: onUpdated.callback
        }

    }

    onUpdatedInit() {
        let onUpdated = this.onUpdated;

        chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
            if (tab.url.match(onUpdated.urlMatch)) {
                if (changeInfo['status'] === "complete") {
                    onUpdated.callback(tabId, changeInfo, tab);
                }
            }
        });
    }
}


export  class ContentMessage {
    constructor() {

    }
}


export  class PopupMessage {
    constructor() {

    }
}