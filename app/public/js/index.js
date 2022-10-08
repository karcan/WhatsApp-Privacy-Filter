//chrome.runtime.sendMessage({ target: "background", event: "re_inject_css" }, function (response) {
//    console.log("Response", response);
//});


document.addEventListener("DOMContentLoaded", function () {

    var settings = {
        keyPress : {
            keys: []
        }
    };

    chrome.runtime.sendMessage({ target: "background", event: "get_settings" }, function (response) {
        settings = response.response.settings;
        document.getElementById("enableDisableShortcut").value = settings.keyPress.keys.join(" + ");
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
        chrome.runtime.sendMessage({ target: "background", event: "save_settings", settings: settings }, function (response) {
            console.log("Response", response);
        });
    });
});

