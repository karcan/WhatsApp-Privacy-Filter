let injectArray = [];
let css = "";
let settings;

function declareCss() {

    css = `
        #pane-side > div:first-of-type > div > div > div:hover * {
            filter: unset !important;
            -webkit-filter: unset !important;
        }
    `;

    if (settings.recentMessageHeader) {
        css += `\n
            /*
                Recent Header
            */
            #pane-side > div:first-of-type > div > div > div > div > div > div:nth-of-type(2) > div:first-of-type > div:first-of-type > span {
                filter: blur(3.6px);
                -webkit-filter: blur(3.6px);
            }
        `;
    }
    if (settings.recentMessageAvatar) {
        css += `\n
            /*
                Recent Avatar
            */
            #pane-side > div:first-of-type > div > div > div > div > div > div:first-of-type > div > div {
                filter: blur(3.6px);
                -webkit-filter: blur(3.6px);
            }
        `;
    }
    if (settings.recentMessageTime) {
        css += `\n
            /*
                Recent > Last Message Time
            */
            #pane-side > div:first-of-type > div > div > div > div > div > div:nth-of-type(2) > div:first-of-type > div:nth-of-type(2) {
                filter: blur(3.6px);
                -webkit-filter: blur(3.6px);
            }

        `;
    }
    if (settings.recentMessageSender) {
        css += `\n
            /*
                Recent Last Message Sender
            */
            #pane-side > div:first-of-type > div > div > div > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div:first-of-type > span > span:first-of-type {
                filter: blur(3.6px);
                -webkit-filter: blur(3.6px);
            }

        `;
    }

    if (settings.recentMessageContent) {
        css += `\n
            /*
                Recent Last Message Content
            */
            #pane-side > div:first-of-type > div > div > div > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div:first-of-type > span > span:nth-of-type(3) {
                filter: blur(3.6px);
                -webkit-filter: blur(3.6px);
            }

        `;
    }

    if (settings.recentMessageTick) {
        css += `\n
            /*
                Recent Last Message Status
            */
            #pane-side > div:first-of-type > div > div > div > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div:first-of-type > span > div:first-of-type {
                filter: blur(3.6px);
                -webkit-filter: blur(3.6px);
            }
        `;
    }

    if (settings.chatBoxTitle) {
        css += `\n
            /*
                Chat Box > Chat Title
            */
            #main > header > div:first-of-type,
            #main > header > div:nth-of-type(2) {
                filter: blur(5.0px);
                -webkit-filter: blur(5.0px);
            }

            #main > header:hover * {
                filter: unset !important;
                -webkit-filter: unset !important;
            }
        `;
    }

    if (settings.chatBoxMessageBox) {
        css += `\n
            /*
                Chat Box > Message Box
            */
            #main > div:nth-of-type(3) > div > div:nth-of-type(2) > div:nth-of-type(3) > div > div,
            #main > div:nth-of-type(3) > div > div:nth-of-type(2) > div:nth-of-type(2) > div > div {
                filter: blur(5.0px);
                -webkit-filter: blur(5.0px);
            }

                #main > div:nth-of-type(3) > div > div:nth-of-type(2) > div:nth-of-type(3) > div > div:hover,
                #main > div:nth-of-type(3) > div > div:nth-of-type(2) > div:nth-of-type(2) > div > div:hover {
                    filter: unset !important;
                    -webkit-filter: unset !important;
                }
        `;
    }
};

function scriptFromFile(file, id, style = null) {
    if (style) {
        var script = document.createElement("link");
        script.href = chrome.runtime.getURL(file);
        script.type = "text/css";
        script.rel = "stylesheet";
        script.id = id;

    } else {
        var script = document.createElement("script");
        script.id = id;
        script.src = chrome.runtime.getURL(file);
    }
    return script;
}

function scriptFromSource(source, id, style = null) {
    if (style) {
        var script = document.createElement("style");
        script.id = id;
        script.textContent = source;
    } else {
        var script = document.createElement("script");
        script.id = id;
        script.textContent = source;
    }


    return script;
}

function inject(scripts) {
    if (scripts.length === 0)
        return;


    var otherScripts = scripts.slice(1);
    var script = scripts[0];

    injectArray.filter(x => x.id == script.id).forEach(function (item, index, object) {
        item.remove();
        injectArray.splice(index, 1);
    });

    var onload = function () {
        //script.parentNode.removeChild(script);
        inject(otherScripts);
    };


    if (script.src != "") {
        script.onload = onload;
        document.head.appendChild(script);

        injectArray.push(script);
    } else {
        document.head.appendChild(script);
        onload();
        injectArray.push(script);
    }


}

function injectCss() {
    inject([scriptFromSource(css, "contentCss", true)]);

};

function deInjectCss() {
    injectArray.filter(x => x.id == "contentCss").forEach(function (item, index, object) {
        item.remove();
        injectArray.splice(index, 1);
    });
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    console.log(msg);
    if (msg.target === 'contentLibrary') {

        if (msg.event === "inject_css") {
            settings = msg.settings;

            if (settings.toggle) {
                declareCss(), injectCss();
            } else {

                declareCss(), deInjectCss();
            }

            sendResponse({ response: "CSS Injected" });

            return true;
        }
        if (msg.event === "de_inject_css") {
            declareCss(), deInjectCss();
            sendResponse({ response: "CSS De-Injected" });

            return true;
        }
        if (msg.event === "clear_localStorage") {
            localStorage.clear();
            sendResponse({ response: "localStorage Cleared" })

            return true;
        }
        if (msg.event === "refresh_page") {
            location.reload();
            sendResponse({ response: "Page Refreshed" })

            return true;
        } else {
            sendResponse({ response: "Unknown" });
        }
    }
});

var keyPress = {
    keys: []
};

window.addEventListener('keydown', function (event) {
    var code = (window.event ? event : e).code;

    if (code === "AltLeft" || code === "ControlLeft" || code === "ShiftLeft" || code === "AltRight" || code === "ControlLeft" || code === "ShiftLeft") {
        event.preventDefault();
    }

    const index = keyPress.keys.indexOf(code);
    if (index == -1) {
        keyPress.keys.push(code)
    }

    chrome.runtime.sendMessage({ target: "background", event: "get_settings" }, function (response) {
        if (JSON.stringify(response.response.settings.keyPress.keys.sort()) == JSON.stringify(keyPress.keys.sort()) && settings.toggle) {
            injectArray.length > 0 ? deInjectCss() : injectCss()
        }
    });


});

window.addEventListener('keyup', function (event) {
    var code = (window.event ? event : e).code;
    event.preventDefault();

    const index = keyPress.keys.indexOf(code);
    if (index > -1) {
        keyPress.keys.splice(index, 1);
    }
});

window.addEventListener('blur', function (event) {
    keyPress.keys = [];

    console.log(keyPress.keys);
});

window.addEventListener('focus', function (event) {
    keyPress.keys = [];

    console.log(keyPress.keys);
});
