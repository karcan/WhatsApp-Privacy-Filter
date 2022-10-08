chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (tab.url.match(/(https?:\/\/|http?:\/\/)*(whatsapp)\.(com)/g)) {
        if (changeInfo['status'] === "complete") {
            chrome.tabs.sendMessage(tabId, { target: "contentLibrary", event: "inject_css" }, function (response) {
                console.log("Response", response);
            });
        }
    }
});

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    console.log("background : ", msg);
    if (msg.target === 'background') {
        if (msg.event === "re_inject_css") {
            chrome.tabs.query({ url: "*://web.whatsapp.com/*" }, function (tabs) {
                for (var tab of tabs) {
                    chrome.tabs.sendMessage(tab.id, { target: "contentLibrary", event: "inject_css" }, function (msg) {
                        console.log("Response", msg);
                    });
                }
            })
            sendResponse({ response: "CSS re-injected." });

            return true;
        }

        else if (msg.event === "save_settings") {
            chrome.storage.local.set({ settings: msg.settings }, function () {
                console.log('Value is set to ' + msg.settings);

                sendResponse({ response: "settings are saved." });
            });

            return true;
        }

        else if (msg.event === "get_settings") {

            chrome.storage.local.get(['settings'], function (result) {
                if (!result.hasOwnProperty("settings")) {
                    result = {
                        settings: {
                            keyPress: {
                                keys:["ControlLeft", "AltLeft", "ShiftLeft"]
                            }
                        }
                    }
                }

                console.log('Value currently is ', result);

                sendResponse({ response: result });
            });

            return true;
        }
        else {
            sendResponse({ response: "unknown" });
        }

    }
});


const uninstallListener = (details) => {
    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.tabs.create({ url: chrome.runtime.getURL("../app/public/welcome.html") });
        chrome.tabs.query({ url: "*://web.whatsapp.com/*" }, function (tabs) {
            for (var tab of tabs) {
                chrome.tabs.reload(tab.id);
            }
        })
    }

    if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
        chrome.tabs.query({ url: "*://web.whatsapp.com/*" }, function (tabs) {
            for (var tab of tabs) {
                chrome.tabs.reload(tab.id);
            }
        })
    }

};

chrome.runtime.onInstalled.addListener(uninstallListener);