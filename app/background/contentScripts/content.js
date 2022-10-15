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
        console.log('content loaded')
        let keyPress = [];
        let injectStatus = false;

        function removeStyleFromFile(id) {
            if (element = document.getElementById(id)) {
                element.parentNode.removeChild(element);
            }
        }

        function addStyleFromFile(id, type) {

            removeStyleFromFile(id);

            const url = chrome.runtime.getURL('app/background/contentStyles/'+ type+ '/' + id + '.css');
            fetch(url)
                .then(
                    function (response) {
                        if (response.status !== 200) {
                            console.log('Looks like there was a problem. Status Code: ' +
                                response.status);
                            return;
                        }

                        // Examine the text in the response
                        response.text().then(function (data) {
                            var script = document.createElement("style");
                            script.id = id;
                            script.textContent = data.replace(id + 'BlurPx', option[id + 'BlurPx'] + 'px');
                            document.head.appendChild(script);
                            return script;
                        });
                    }
                )
                .catch(function (err) {
                    console.log('Fetch Error :-S', err);
                });
        }

        function deInject() {
            console.log('de injected');
            removeStyleFromFile('recentMessageHeader');
            removeStyleFromFile('recentMessageAvatar');
            removeStyleFromFile('recentMessageTime');
            removeStyleFromFile('recentMessageSender');
            removeStyleFromFile('recentMessageContent');
            removeStyleFromFile('recentMessageTick');
            removeStyleFromFile('chatBoxTitle');
            removeStyleFromFile('chatBoxMessageBox');

            injectStatus = false;
        };

        function inject() {
            if (option.toggle) {
                console.log('injected');
                option.recentMessageHeader ? addStyleFromFile('recentMessageHeader', 'blur') : removeStyleFromFile('recentMessageHeader');
                option.recentMessageAvatar ? addStyleFromFile('recentMessageAvatar', 'blur') : removeStyleFromFile('recentMessageAvatar');
                option.recentMessageTime ? addStyleFromFile('recentMessageTime', 'blur') : removeStyleFromFile('recentMessageTime');
                option.recentMessageSender ? addStyleFromFile('recentMessageSender', 'blur') : removeStyleFromFile('recentMessageSender');
                option.recentMessageContent ? addStyleFromFile('recentMessageContent', 'blur') : removeStyleFromFile('recentMessageContent');
                option.recentMessageTick ? addStyleFromFile('recentMessageTick', 'blur') : removeStyleFromFile('recentMessageTick');
                option.chatBoxTitle ? addStyleFromFile('chatBoxTitle', 'blur') : removeStyleFromFile('chatBoxTitle');
                option.chatBoxMessageBox ? addStyleFromFile('chatBoxMessageBox', 'blur') : removeStyleFromFile('chatBoxMessageBox');

                injectStatus = true;

            } else {
                deInject();
            }

            option.fullScreen ? addStyleFromFile('fullScreen', 'screen') : removeStyleFromFile('fullScreen');

        };

        inject();

        /* keydown */
        window.onkeydown = function (event) {
            var code = (window.event ? event : e).code;



            if (code === "AltLeft" || code === "ControlLeft" || code === "ShiftLeft" || code === "AltRight" || code === "ControlLeft" || code === "ShiftLeft") {
                event.preventDefault();
            }

            const index = keyPress.indexOf(code);
            if (index == -1) {
                keyPress.push(code)
            }

            if (JSON.stringify(option.keyPress.sort()) == JSON.stringify(keyPress.sort()) && option.toggle) {

                event.preventDefault();
                injectStatus ? deInject() : inject()
                console.log("shortcut used");
            }
        };


        /* keyup */
        window.onkeyup = function (event) {
            var code = (window.event ? event : e).code;

            if (code === "AltLeft" || code === "ControlLeft" || code === "ShiftLeft" || code === "AltRight" || code === "ControlLeft" || code === "ShiftLeft") {
                event.preventDefault();
            }

            if (JSON.stringify(option.keyPress.sort()) == JSON.stringify(keyPress.sort()) && option.toggle) {
                event.preventDefault();
            }

            const index = keyPress.indexOf(code);
            if (index > -1) {
                keyPress.splice(index, 1);
            }
        };


        /* blur */
        window.addEventListener('blur', function (event) {
            keyPress = [];
        });

        /* focus */
        window.addEventListener('focus', function (event) {
            keyPress = [];
        });
    }
);