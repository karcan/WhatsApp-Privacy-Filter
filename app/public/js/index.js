//chrome.runtime.sendMessage({ target: "background", event: "re_inject_css" }, function (response) {
//    console.log("Response", response);
//});


document.addEventListener("DOMContentLoaded", function () {

    var settings = {
        toggle: null,
        recentMessageHeader: null,
        recentMessageAvatar: null,
        recentMessageTime: null,
        recentMessageSender: null,
        recentMessageContent: null,
        recentMessageTick: null,
        chatBoxTitle: null,
        chatBoxMessageBox: null,
        keyPress : {
            keys: []
        }
    };

    chrome.runtime.sendMessage({ target: "background", event: "get_settings" }, function (response) {
        settings = response.response.settings;
        document.getElementById("enableDisableShortcut").value = settings.keyPress.keys.join(" + ");
        document.getElementById("toggle").checked = settings.toggle;
        document.getElementById("recentMessageHeader").checked = settings.recentMessageHeader;
        document.getElementById("recentMessageAvatar").checked = settings.recentMessageAvatar;
        document.getElementById("recentMessageTime").checked = settings.recentMessageTime;
        document.getElementById("recentMessageSender").checked = settings.recentMessageSender;
        document.getElementById("recentMessageContent").checked = settings.recentMessageContent;
        document.getElementById("recentMessageTick").checked = settings.recentMessageTick;
        document.getElementById("chatBoxTitle").checked = settings.chatBoxTitle;
        document.getElementById("chatBoxMessageBox").checked = settings.chatBoxMessageBox;

        console.log(settings);
    });

    window.addEventListener('keyup', function (event) {
        event.preventDefault();
    });

    window.addEventListener('keydown', function (event) {
        event.preventDefault();
    });

    document.getElementById("enableDisableShortcut").addEventListener('keydown', function (event) {
        var code = (window.event ? event : e).code;
        event.preventDefault();

        const index = settings.keyPress.keys.indexOf(code);
        if (index == -1) {
            settings.keyPress.keys.push(code)
        }

        if (code === "Backspace") {
            settings.keyPress.keys = []
        }

        this.value = settings.keyPress.keys.join(" + ");
    });

    document.getElementById("enableDisableShortcut").addEventListener('keyup', function (event) {
        var code = (window.event ? event : e).code;
        event.preventDefault();

        if (code === "Backspace" || code === "Delete") {
            settings.keyPress.keys = []
        }

        this.value = settings.keyPress.keys.join(" + ");
    });

    document.getElementById("save").addEventListener('click', function (event) {
        settings.toggle = document.getElementById("toggle").checked;
        settings.recentMessageHeader = document.getElementById("recentMessageHeader").checked;
        settings.recentMessageAvatar = document.getElementById("recentMessageAvatar").checked;
        settings.recentMessageTime = document.getElementById("recentMessageTime").checked;
        settings.recentMessageSender = document.getElementById("recentMessageSender").checked;
        settings.recentMessageContent = document.getElementById("recentMessageContent").checked;
        settings.recentMessageTick = document.getElementById("recentMessageTick").checked;
        settings.chatBoxTitle = document.getElementById("chatBoxTitle").checked;
        settings.chatBoxMessageBox = document.getElementById("chatBoxMessageBox").checked;

        chrome.runtime.sendMessage({ target: "background", event: "save_settings", settings: settings }, function (response) {
            console.log("Response", response);
        });

        chrome.runtime.sendMessage({ target: "background", event: "re_inject_css", settings: settings }, function (response) {
            console.log("Response", response);
        });
    });
    document.getElementById("donate").addEventListener('click', function (event) {
        window.open("https://www.patreon.com/karcan", '_blank');

    });
});

