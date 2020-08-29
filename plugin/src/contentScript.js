fetch('http://localhost:3000/string/').then(response => response.json()).then(wordbook => {
    for(let element of window.document.getElementsByTagName('p')) {
        const words = element.innerText.split(' ');
        element.innerText = '';
        words.forEach(word => {
            const span = document.createElement('span');
            span.innerText = word + ' ';
            if (word.match(/\d/)) {
                span.style.background = 'none';
            } else if (wordbook.indexOf(word.toString().toLowerCase()) === -1) {
                span.style.color = 'rgb(255,0,0)';
            } else {
                span.style.color = 'rgb(0,0,0)';
            }
            element.appendChild(span);
        });
    }
});
