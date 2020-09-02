const lever = window.document.getElementsByClassName('lever')[0];
const settings = {};

chrome.storage.sync.get(['enable'], function(result) {
    settings.enable = result.enable;
    changeStyles();
});

lever.addEventListener('click', () => changeEnable());

const changeEnable = () => {
    settings.enable = !settings.enable;
    chrome.storage.sync.set({enable: settings.enable}, function() {
        changeStyles();
    });
};

const changeStyles = () => {
    lever.style.justifyContent = settings.enable ? 'flex-start' : 'flex-end';
    lever.style.background = settings.enable ? '#c2d7bf' : '#d7d7d7';
};
