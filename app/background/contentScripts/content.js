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
        //script.parentNode.removeChild(script);
        inject(otherScripts);
    };
    if (script.src != "") {
        script.onload = onload;
        document.head.appendChild(script);
    } else {
        document.head.appendChild(script);
        onload();
    }
}

console.log('inject started..');
inject([
    //scriptFromFile("app/public/js/jquery-3.5.1.min.js"),
    scriptFromFile("app/background/contentStyles/content.css", true),
    scriptFromFile("app/background/contentScripts/lib.js")
]);

