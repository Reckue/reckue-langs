chrome.storage.sync.set({wordbook: 'Spring Security'}, function () {
    console.log(123);
});

chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({pageUrl: {schemes: ['https'] }})],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
});
