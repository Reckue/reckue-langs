const navMenu = window.document.getElementsByClassName('nav-menu')[0];
const content = window.document.getElementsByClassName('content')[0];
const buttons = navMenu.getElementsByClassName('nav-button');
const refresh = window.document.getElementsByClassName('refresh-btn')[0];

const callParser = () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {file: 'onNewPageLoad.js'});
    });
};

refresh.addEventListener('click', () => callParser());

const checkButtonsAndSetContentVisibility = () => {
    for (let button of buttons) {
        const className = button.innerText.toLowerCase();
        if (button.disabled) {
            setContentVisibility(className, 'visible');
        } else {
            setContentVisibility(className, 'hidden');
        }
    }
};

const setContentVisibility = (className, value) => {
    const entry = content.getElementsByClassName(className)[0];
    entry.style.visibility = value;
    if (value === 'visible') {
        entry.style.transform = 'translate(0px)';
    } else {
        entry.style.transform = 'translate(-400px)';
    }
};

checkButtonsAndSetContentVisibility();

for (let button of buttons) {
    button.addEventListener("click", ev => onClick(ev));
}

const onClick = (event) => {
    for (let button of buttons) {
        button.disabled = false;
    }
    event.target.disabled = true;
    checkButtonsAndSetContentVisibility();
};
