let injectArray = [];

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
    inject([scriptFromFile("app/background/contentStyles/content.css", "contentCss", true)]);
};

function deInjectCss() {
    injectArray.filter(x => x.id == "contentCss").forEach(function (item, index, object) {
        item.remove();
        injectArray.splice(index, 1);
    });
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.target === 'contentLibrary') {
        switch (msg.event) {
            case "inject_css": {

                injectCss();
                sendResponse({ response: "CSS Injected" });
            }
                break;

            case "de_inject_css": {

                deInjectCss();
                sendResponse({ response: "CSS De-Injected" });
            }
                break;

            case "clear_localStorage": {
                localStorage.clear();
                sendResponse({ response: "localStorage Cleared" })
            }
                break;

            case "refresh_page": {
                location.reload();
                sendResponse({ response: "Page Refreshed" })
            }

            default:
                sendResponse({ response: "Unknown" });
        }
    }
});