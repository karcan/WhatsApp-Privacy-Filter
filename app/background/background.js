import { BackgroundMessage } from '../lib/chrome-message.js';


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

    if (tab.url.match(/(https?:\/\/|http?:\/\/)*(whatsapp)\.(com)/g)) {
        //console.log("WhatsApp detected..", changeInfo);
        if (changeInfo['status'] === "complete") {
            var apiPath = "/metadata?webp=true&movieid=" + 1 + "&imageFormat=webp";

            chrome.tabs.sendMessage(tabId, { target: "contentLibrary", event: "first_inject" }, function (msg) {
                //console.log("msg", msg);
                //msg = msg || {};
                //if (!msg.response) {
                //    chrome.scripting.executeScript(
                //        {
                //            target: { tabId: tab.id },
                //            files: ['app/background/contentScripts/lib.js'],
                //            // function: () => {}, // files or function, both do not work.
                //        })
                //}
            });
        }
    }
});


let bgMessage = new BackgroundMessage({
    urlMatch: /(https?:\/\/|http?:\/\/)*(whatsapp)\.(com)/g,
    callback: function (tabId, changeInfo, tab) {
        console.log(tabId, changeInfo, tab);
    }
});

bgMessage.onUpdatedInit();

//chrome.tabs.sendMessage(tabId, { target: "contentLibrary", event: "first_inject" }, function (msg) {
//    console.log("msg", msg);
//    //msg = msg || {};
//    //if (!msg.response) {
//    //    chrome.scripting.executeScript(
//    //        {
//    //            target: { tabId: tab.id },
//    //            files: ['app/background/contentScripts/lib.js'],
//    //            // function: () => {}, // files or function, both do not work.
//    //        })
//    //}
//});


//chrome.tabs.query({ url: "*://web.whatsapp.com/*" }, function (tabs) {
//    console.log("whatsApp detected.")
//    for (var tab of tabs) {
//        chrome.tabs.sendMessage(tab.id, { target: "contentLibrary", event: "first_inject" }, function (msg) {
//            console.log("msg", msg);
//            msg = msg || {};
//            if (!msg.response) {
//                chrome.scripting.executeScript(
//                    {
//                        target: { tabId: tab.id },
//                        files: ['app/background/contentScripts/lib.js'],
//                        // function: () => {}, // files or function, both do not work.
//                    })
//            }
//        });
//    }
//})