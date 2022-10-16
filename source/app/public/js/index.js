document.addEventListener("DOMContentLoaded", function () {
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
            'fullScreen',
            'windowOut',
            'windowFocus'
        ], function (option) {

            injectQueue = [];

            let manifest = chrome.runtime.getManifest();
            document.getElementById("appVersion").textContent = 'v' + manifest.version;

            function inject() {
                chrome.tabs.query({ url: "*://web.whatsapp.com/*" }, function (tabs) {
                    tabs.forEach(function (tab) { chrome.scripting.executeScript({ target: { tabId: tab.id, allFrames: true }, files: ['app/background/contentScripts/content.js'] }) });
                })
            };

            document.getElementById("toggle").checked = option.toggle;
            document.getElementById("recentMessageHeader").checked = option.recentMessageHeader;
            document.getElementById("recentMessageHeaderBlurPx").value = option.recentMessageHeaderBlurPx;
            document.getElementById("recentMessageAvatar").checked = option.recentMessageAvatar;
            document.getElementById("recentMessageAvatarBlurPx").value = option.recentMessageAvatarBlurPx;
            document.getElementById("recentMessageTime").checked = option.recentMessageTime;
            document.getElementById("recentMessageTimeBlurPx").value = option.recentMessageTimeBlurPx;
            document.getElementById("recentMessageSender").checked = option.recentMessageSender;
            document.getElementById("recentMessageSenderBlurPx").value = option.recentMessageSenderBlurPx;
            document.getElementById("recentMessageContent").checked = option.recentMessageContent;
            document.getElementById("recentMessageContentBlurPx").value = option.recentMessageContentBlurPx;
            document.getElementById("recentMessageTick").checked = option.recentMessageTick;
            document.getElementById("recentMessageTickBlurPx").value = option.recentMessageTickBlurPx;
            document.getElementById("chatBoxTitle").checked = option.chatBoxTitle;
            document.getElementById("chatBoxTitleBlurPx").value = option.chatBoxTitleBlurPx;
            document.getElementById("chatBoxMessageBox").checked = option.chatBoxMessageBox;
            document.getElementById("chatBoxMessageBoxBlurPx").value = option.chatBoxMessageBoxBlurPx;
            document.getElementById("keyPress").value = option.keyPress.join(" + ");
            document.getElementById("fullScreen").checked = option.fullScreen;
            document.getElementById("windowOut").checked = option.windowOut;
            document.getElementById("windowFocus").checked = option.windowFocus;


            document.getElementById("toggle").addEventListener('change', function (e) {
                chrome.storage.local.set({ toggle: this.checked });
                inject();
            });
            document.getElementById("recentMessageHeader").addEventListener('change', function (e) {
                chrome.storage.local.set({ recentMessageHeader: this.checked });
                inject();
            });
            document.getElementById("recentMessageHeaderBlurPx").addEventListener('input', function (e) {
                chrome.storage.local.set({ recentMessageHeaderBlurPx: this.value });
                injectQueue.push(inject);
            });
            document.getElementById("recentMessageAvatar").addEventListener('change', function (e) {
                chrome.storage.local.set({ recentMessageAvatar: this.checked });
                inject();
            });
            document.getElementById("recentMessageAvatarBlurPx").addEventListener('input', function (e) {
                chrome.storage.local.set({ recentMessageAvatarBlurPx: this.value });
                injectQueue.push(inject);
            });
            document.getElementById("recentMessageTime").addEventListener('change', function (e) {
                chrome.storage.local.set({ recentMessageTime: this.checked });
                inject();
            });
            document.getElementById("recentMessageTimeBlurPx").addEventListener('input', function (e) {
                chrome.storage.local.set({ recentMessageTimeBlurPx: this.value });
                injectQueue.push(inject);
            });
            document.getElementById("recentMessageSender").addEventListener('change', function (e) {
                chrome.storage.local.set({ recentMessageSender: this.checked });
                inject();
            });
            document.getElementById("recentMessageSenderBlurPx").addEventListener('input', function (e) {
                chrome.storage.local.set({ recentMessageSenderBlurPx: this.value });
                injectQueue.push(inject);
            });
            document.getElementById("recentMessageContent").addEventListener('change', function (e) {
                chrome.storage.local.set({ recentMessageContent: this.checked });
                inject();
            });
            document.getElementById("recentMessageContentBlurPx").addEventListener('input', function (e) {
                chrome.storage.local.set({ recentMessageContentBlurPx: this.value });
                injectQueue.push(inject);
            });
            document.getElementById("recentMessageTick").addEventListener('change', function (e) {
                chrome.storage.local.set({ recentMessageTick: this.checked });
                inject();
            });
            document.getElementById("recentMessageTickBlurPx").addEventListener('input', function (e) {
                chrome.storage.local.set({ recentMessageTickBlurPx: this.value });
                injectQueue.push(inject);
            });
            document.getElementById("chatBoxTitle").addEventListener('change', function (e) {
                chrome.storage.local.set({ chatBoxTitle: this.checked });
                inject();
            });
            document.getElementById("chatBoxTitleBlurPx").addEventListener('input', function (e) {
                chrome.storage.local.set({ chatBoxTitleBlurPx: this.value });
                injectQueue.push(inject);
            });
            document.getElementById("chatBoxMessageBox").addEventListener('change', function (e) {
                chrome.storage.local.set({ chatBoxMessageBox: this.checked });
                inject();
            });
            document.getElementById("chatBoxMessageBoxBlurPx").addEventListener('input', function (e) {
                chrome.storage.local.set({ chatBoxMessageBoxBlurPx: this.value });
                injectQueue.push(inject);
            });
            document.getElementById("keyPressAssign").addEventListener('click', function (e) {
                chrome.storage.local.set({ keyPress: option.keyPress });
                inject();
            });
            document.getElementById("fullScreen").addEventListener('change', function (e) {
                chrome.storage.local.set({ fullScreen: this.checked });
                inject();
            });
            document.getElementById("windowOut").addEventListener('change', function (e) {
                chrome.storage.local.set({ windowOut: this.checked });
                inject();
            });
            document.getElementById("windowFocus").addEventListener('change', function (e) {
                chrome.storage.local.set({ windowFocus: this.checked });
                inject();
            });

            document.getElementById("keyPress").addEventListener('keydown', function (event) {
                var code = (window.event ? event : e).code;
                event.preventDefault();

                if (code === "Backspace" || code === "Delete") {
                    option.keyPress = []
                } else {
                    const index = option.keyPress.indexOf(code);
                    if (index == -1) {
                        option.keyPress.push(code)
                    }
                }

                this.value = option.keyPress.join(" + ");
            });

            document.getElementById("keyPress").addEventListener('keyup', function (event) {
                var code = (window.event ? event : e).code;
                event.preventDefault();

                if (code === "Backspace" || code === "Delete") {
                    option.keyPress = []
                }

                this.value = option.keyPress.join(" + ");
            });

            document.getElementById("donate").addEventListener('click', function (event) {
                event.preventDefault();
                window.open("https://www.patreon.com/karcan", '_blank');

            });

            document.getElementById("popout").addEventListener('click', function (event) {
                function getTabs() {
                    return new Promise((resolve, reject) => {
                        let tabArr = [];

                        try {
                            chrome.tabs.query({ url: "*://web.whatsapp.com/*" }, function (tabs) {
                                tabs.forEach(function (tab) {
                                    tabArr.push(tab);
                                });
                                resolve(tabArr);
                            })
                        } catch (e) {
                            reject(e);
                        }
                    })
                }

                async function getTabAsync() {
                    const tabArr = await getTabs();

                    if (tab = tabArr[0]) {
                        console.log("current whatsapp tab moved as popout");
                        chrome.windows.create({ type: "panel", tabId: tab.id })
                    } else {
                        console.log("new whatsapp page opened as popout");
                        chrome.windows.create({ type: "panel", url: "https://web.whatsapp.com" });
                    }
                }

                getTabAsync();



            })

            document.getElementById("chromeStore").addEventListener('click', function (event) {
                event.preventDefault();
                window.open("https://chrome.google.com/webstore/detail/whatsapp-privacy-filter/ppamjkdhajaohmhhhbccojhgigkmbkeb", '_blank');
            });

            document.getElementById("github").addEventListener('click', function (event) {
                event.preventDefault();
                window.open("https://github.com/karcan/WhatsApp-Privacy-Filter", '_blank');
            });

            document.getElementById("mozillaAddons").addEventListener('click', function (event) {
                event.preventDefault();
                window.open("https://addons.mozilla.org/firefox/addon/whatsapp-privacy-filter/", '_blank');
            });

            document.getElementById("edgeAddons").addEventListener('click', function (event) {
                event.preventDefault();
                window.open("https://microsoftedge.microsoft.com/addons/detail/whatsapp-privacy-filter/nhgbamgbiccfkbcnchkphnfjaabpijgn", '_blank');
            });

            setInterval(() => {
                if (injectQueue.length > 0) {
                    injectQueue[0]();
                    injectQueue = [];
                }
            }, 1000);

        });
});