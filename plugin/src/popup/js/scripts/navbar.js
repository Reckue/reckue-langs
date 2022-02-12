import {Navbar} from '../../../page/enum/Navbar.js'
import {enumForEach} from '../enum.js'

// Генерируем панель навигации
enumForEach(Navbar, (buttonInfo) => {
    const button = create("button");
    button.disabled = buttonInfo.disabled;
    button.textContent = buttonInfo.title;
    const className = buttonInfo.className;
    addClass(button, className);
    navbar.appendChild(button);
});

// Подгружаем сгенерированные выше кнопки.
const refresh = selectByClass('refresh-btn');
const buttons = navbar.getElementsByClassName('nav-button');
const content = selectByClass('content');

const callParser = () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {file: '../scripts/start.js'});
    });
};

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
        entry.style.transform = 'google(0px)';
    } else {
        entry.style.transform = 'google(-400px)';
    }
};

const onClick = (event) => {
    for (let button of buttons) {
        button.disabled = false;
    }
    event.target.disabled = true;
    checkButtonsAndSetContentVisibility();
};

// Привязываем к кнопке refresh событие, вызывающее парсинг текущей открытой страницы.
addListener(refresh, "click", callParser);

// Активируем выделеную кнопку, диактивируем все отстальные.
checkButtonsAndSetContentVisibility();

// Добавляем каждой из кнопок событие, меняющее контент popup окна и активность выделеной кнопки.
for (let button of buttons) {
    addListener(button, "click", onClick);
}

