fetch('http://localhost:3000/string/').then(response => response.json()).then(wordbook => {
    for(let element of window.document.getElementsByTagName('p')) {
        const words = element.innerText.split(' ');
        element.innerText = '';
        words.forEach(word => {
            const a = document.createElement('a');
            a.innerText = word + ' ';
            const clearWord = word.toString().toLowerCase().replace(/[\W]/g, '');
            if (!word.match(/\d/)) {
                if (wordbook.indexOf(clearWord.concat(' good')) !== -1) {
                    a.style.color = 'rgb(0,0,0)';
                } else {
                    if (wordbook.indexOf(clearWord.concat(' average')) !== -1) {
                        a.style.color = 'rgb(0,183,237)';
                    } else if (wordbook.indexOf(clearWord.concat(' bad')) !== -1) {
                        a.style.color = 'rgb(255,144,0)';
                    } else {
                        a.style.color = 'rgb(255,0,0)';
                    }
                    a.href = `https://translate.google.com/#view=home&op=translate&sl=en&tl=ru&text=${clearWord}`;
                    a.target = "_blank";
                }
            }
            element.appendChild(a);
        });
    }
});
