/* jshint esnext: true */
/*jslint browser: true*/
(function () {
    'use strict';

    function RndText(w) {
        var that = this,
            words = w || [],
            wordIndex = 0,
            htmlElement = null,
            SRC = '0123456789*abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$%&¥',
            targetWord,
            playCount = 50,
            loopNum,
            currentText,
            ROEnable = true;

        function onROHandler(event) {
            htmlElement.dispatchEvent(new CustomEvent(RndText.NEXT));

            loopNum = 0;
            if (wordIndex >= words.length) {
                targetWord = words[Math.floor(Math.random() * words.length)];
                htmlElement.dispatchEvent(new CustomEvent(RndText.END));
            } else {
                targetWord = words[wordIndex++];
            }

            htmlElement.removeEventListener('mouseover', onROHandler);
            window.requestAnimationFrame(changeLetter);
            return event;
        }

        function changeLetter(event) {
            loopNum++;
            currentText = '';
            var num = targetWord.length;

            for (var i = 0; i < num; i++) {
                if (loopNum - playCount < i) {
                    currentText = currentText + SRC.charAt(Math.floor(Math.random() * SRC.length));
                    continue;
                }
                currentText = currentText + targetWord.charAt(i);
            }
            htmlElement.innerHTML = currentText;
            if (currentText == targetWord) {
                if (ROEnable) {
                    htmlElement.addEventListener('mouseover', onROHandler);
                }
            } else {
                window.requestAnimationFrame(changeLetter);
            }
            return event;
        }


        function init() {
            htmlElement = document.createElement('div');
            htmlElement.innerHTML = words[wordIndex];
            htmlElement.addEventListener('mouseover', onROHandler);
            that.htmlElement = htmlElement;
        }


        init();
        return {
            get html() {
                return htmlElement;
            },
            next: function () {
                onROHandler();
            }
        };
    }

    Object.defineProperty(RndText, 'NEXT', {
        value: 'NEXT'
    });
    Object.defineProperty(RndText, 'END', {
        value: 'END'
    });

    /* Example usage:
var r = new RndText([
    'I know she is coming,',
    'I know she will look,',
    'This is the longing,',
    'And this is the book.'
]);
*/
})();
