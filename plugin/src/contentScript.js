fetch('http://localhost:3000/').then(response => response.json()).then(wordbook => {
    for(let element of window.document.getElementsByTagName('p')) {
        const words = element.innerText.split(' ');
        element.innerText = '';
        words.forEach(word => {
            const span = document.createElement('span');
            span.innerText = word.toLowerCase() + ' ';
            if (wordbook.indexOf(word.toLowerCase()) === -1) {
                span.style.background = 'rgba(255, 0, 0, 0.1)';
            } else {
                span.style.background = 'rgba(0, 255, 0, 0.1)';
            }
            element.appendChild(span);
        });
    }
});

