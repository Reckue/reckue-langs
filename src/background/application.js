chrome.storage.local.set({enable: true, russian: true, english: true, china: true, korean: true});

chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({pageUrl: {schemes: ['https', 'http']} })],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
});
