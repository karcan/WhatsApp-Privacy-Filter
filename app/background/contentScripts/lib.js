var injected = false;
var scriptArray = [];
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    console.log(msg);
    if (msg.target === 'contentLibrary') {
        switch (msg.event) {
            case "first_inject": {

                //inject([
                //    scriptFromFile("app/background/contentStyles/content.css", true)
                //]), injected = true, sendResponse({ response: injected });

                sendResponse({ response: injected });
            }

            case "re_inject": {
                //inject([
                //    scriptFromFile("app/background/contentStyles/content.css", true)
                //]), injected = true, sendResponse({ response: injected });

                sendResponse({ response: injected });
            }
            default:
        }
        
    }
});



function scriptFromFile(file, style = null) {
    if (style) {
        var script = document.createElement("link");
        script.href = chrome.runtime.getURL(file);
        script.type = "text/css";
        script.rel = "stylesheet";

    } else {
        var script = document.createElement("script");
        script.src = chrome.runtime.getURL(file);
    }
    return script;
}

function scriptFromSource(source, style = null) {
    if (style) {
        var script = document.createElement("style");
        script.textContent = source;
    } else {
        var script = document.createElement("script");
        script.textContent = source;
    }


    return script;
}

function inject(scripts) {
    if (scripts.length === 0)
        return;

    var otherScripts = scripts.slice(1);
    var script = scripts[0];

    var onload = function () {
        inject(otherScripts);
    };

    if (script.src != "") {
        script.onload = onload;
        document.head.appendChild(script);
        scriptArray.push(script);
    } else {
        document.head.appendChild(script);
        scriptArray.push(script);
        onload();
    }
}

setInterval(() => {
    for (var sc of scriptArray) {
        console.log(sc);
    }
    
}, 5000)