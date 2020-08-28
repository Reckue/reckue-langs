

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(tabs[0].id, {code: "chrome.storage.sync.get(['wordbook'], function(result) {\n" +
            "    localStorage.setItem('wordbook', result.wordbook);\n" +
            "});"});
    chrome.tabs.executeScript(tabs[0].id, {code: "let wordbook = localStorage.getItem('wordbook');\n" +
            "let vocabulary = wordbook.split(' ');\n" +
            "for(let element of window.document.getElementsByTagName('p')) {\n" +
            "    const words = element.innerText.split(' ');\n" +
            "    element.innerText = '';\n" +
            "    words.forEach(word => {\n" +
            "        const span = document.createElement('span');\n" +
            "        span.innerText = word + ' ';\n" +
            "        if (!vocabulary.contains(word)) {\n" +
            "            span.style.background = '#ffaaa1';\n" +
            "        }\n" +
            "        element.appendChild(span);\n" +
            "    });\n" +
            "}"});
});
