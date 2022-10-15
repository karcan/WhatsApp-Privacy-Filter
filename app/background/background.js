chrome.storage.local.get(
    [
        'toggle',
        'recentMessageHeader',
        'recentMessageHeaderBlurPx',
        'recentMessageAvatar',
        'recentMessageAvatarBlurPx',
        'recentMessageTime',
        'recentMessageTimeBlurPx',
        'recentMessageSender',
        'recentMessageSenderBlurPx',
        'recentMessageContent',
        'recentMessageContentBlurPx',
        'recentMessageTick',
        'recentMessageTickBlurPx',
        'chatBoxTitle',
        'chatBoxTitleBlurPx',
        'chatBoxMessageBox',
        'chatBoxMessageBoxBlurPx',
        'keyPress',
        'fullScreen'
    ], function (option) {

        option.toggle == null && chrome.storage.local.set({ toggle: true});
        option.recentMessageHeader == null && chrome.storage.local.set({recentMessageHeader: true});
        option.recentMessageHeaderBlurPx == null && chrome.storage.local.set({ recentMessageHeaderBlurPx: "5"});
        option.recentMessageAvatar == null && chrome.storage.local.set({recentMessageAvatar: true});
        option.recentMessageAvatarBlurPx == null && chrome.storage.local.set({ recentMessageAvatarBlurPx: "5"});
        option.recentMessageTime == null && chrome.storage.local.set({recentMessageTime: true});
        option.recentMessageTimeBlurPx == null && chrome.storage.local.set({ recentMessageTimeBlurPx: "5"});
        option.recentMessageSender == null && chrome.storage.local.set({recentMessageSender: true});
        option.recentMessageSenderBlurPx == null && chrome.storage.local.set({ recentMessageSenderBlurPx: "5"});
        option.recentMessageContent == null && chrome.storage.local.set({recentMessageContent: true});
        option.recentMessageContentBlurPx == null && chrome.storage.local.set({ recentMessageContentBlurPx: "5"});
        option.recentMessageTick == null && chrome.storage.local.set({recentMessageTick: true});
        option.recentMessageTickBlurPx == null && chrome.storage.local.set({ recentMessageTickBlurPx: "5"});
        option.chatBoxTitle == null && chrome.storage.local.set({chatBoxTitle: true});
        option.chatBoxTitleBlurPx == null && chrome.storage.local.set({ chatBoxTitleBlurPx: "5"});
        option.chatBoxMessageBox == null && chrome.storage.local.set({ chatBoxMessageBox: true });
        option.chatBoxMessageBoxBlurPx == null && chrome.storage.local.set({ chatBoxMessageBoxBlurPx: "8"});
        option.keyPress == null && chrome.storage.local.set({ keyPress: ['AltLeft', 'ShiftLeft']});
        option.fullScreen == null && chrome.storage.local.set({ fullScreen: true});

        chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
            if (tab.url.match(/(https?:\/\/|http?:\/\/)*(whatsapp)\.(com)/g)) {
                if (changeInfo['status'] === "complete") {
                    chrome.scripting.executeScript({ target: { tabId: tab.id, allFrames: true }, files: ['app/background/contentScripts/content.js'] })
                }
            }
        });

        
    }
);


const uninstallListener = (details) => {

    console.log(details);

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