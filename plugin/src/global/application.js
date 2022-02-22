chrome.storage.local.set({enable: true}, function() {});

chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({pageUrl: {schemes: ['https', 'http']} })],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
});
