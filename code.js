

let wordbook = localStorage.getItem('wordbook');
let vocabulary = wordbook.split(' ');
for(let element of window.document.getElementsByTagName('p')) {
    const words = element.innerText.split(' ');
    element.innerText = '';
    words.forEach(word => {
        const span = document.createElement('span');
        span.innerText = word + ' ';
        if (!vocabulary.contains(word)) {
            span.style.background = '#ffaaa1';
        }
        element.appendChild(span);
    });
}
