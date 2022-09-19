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
        switch (msg.event) {
            case "re_inject_css": {
                chrome.tabs.query({ url: "*://web.whatsapp.com/*" }, function (tabs) {
                    for (var tab of tabs) {
                        chrome.tabs.sendMessage(tab.id, { target: "contentLibrary", event: "inject_css" }, function (msg) {
                            console.log("Response", msg);
                        });
                    }
                })

                sendResponse({ response: "CSS re-injected." });
            }
            default:
                sendResponse({ response: "unknown" });
        }
    }
});


chrome.runtime.onInstalled.addListener(function () {
    chrome.tabs.query({ url: "*://web.whatsapp.com/*" }, function (tabs) {
        for (var tab of tabs) {
            chrome.tabs.sendMessage(tab.id, { target: "contentLibrary", event: "inject_css" }, function (msg) {
                console.log("Response", msg);
            });
        }
    })
});


const uninstallListener = (details) => {
    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        console.log("install");
    }

    if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
        console.log("update");
    }

};

chrome.runtime.onInstalled.addListener(uninstallListener);