chrome.runtime.sendMessage({ target: "background", event: "re_inject_css" }, function (response) {
    console.log("Response", response);
});