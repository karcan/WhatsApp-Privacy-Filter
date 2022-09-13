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

// var k = {
//     cssOptions: {
//         recentHeader: {
//             cssClass: "#pane-side > div:first-of-type > div > div > div > div > div > div:nth-of-type(2) > div:first-of-type > div:first-of-type > span", 
//             blurPx: "3.6"
//         },
//         recentHeaderOver: { 
//             cssClass: "#pane-side > div:first-of-type > div > div > div > div > div > div:nth-of-type(2) > div:first-of-type > div:first-of-type > span:hover", 
//             blurPx: "5" },
//         recentAvatar: "#pane-side > div:first-of-type > div > div > div > div > div > div:first-of-type > div > div",
//         recentAvatarOver: "#pane-side > div:first-of-type > div > div > div > div > div > div:first-of-type > div > div:hover",

//     }
// };

// var file = chrome.runtime.getURL("app/background/contentStyles/content.css");
// var request = new XMLHttpRequest();
// request.open('GET', file, true);
// request.responseType = 'blob';
// request.onload = function () {
//     var reader = new FileReader();
//     reader.readAsText(request.response);
//     reader.onload = function (e) {
//         //console.log(e.target.result);

//         var fileContent = e.target.result;

//         for (const [key, value] of Object.entries(k.cssOptions)) {
//             fileContent = fileContent.replace('#' + key, value);
//         }

//         inject([
//             scriptFromSource(fileContent, true),
//         ]);

//     };
// };
// request.send();


inject([
    //scriptFromFile("app/public/js/jquery-3.5.1.min.js"),
    scriptFromFile("app/background/contentStyles/content.css", true),
    scriptFromFile("app/background/contentScripts/lib.js")
]);



