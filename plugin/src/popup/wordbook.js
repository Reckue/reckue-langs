const wordbookBlock = window.document.getElementsByClassName('words')[0];
const addWordInput = window.document.getElementById('add');
addWordInput.addEventListener("change", function (event) {
    console.log(event.target.value);
    fetch('http://localhost:3000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({word: event.target.value})
        }).then(response => response.json())
        .then(words => updateWords(words));
});


const getWordbook = async () => {
    return await fetch('http://localhost:3000/').then(response => response.json());
};

const updateWords = (words) => {
    wordbookBlock.innerHTML = '';
    for (const word of words) {
        const wordDiv = document.createElement('div');
        wordDiv.innerText = word;
        wordDiv.addEventListener("click", function (event) {
            console.log(word);
            fetch(`http://localhost:3000/${word}`,{method: 'DELETE'})
                .then(response => response.json())
                .then(words => updateWords(words));
        });
        wordbookBlock.appendChild(wordDiv);
    }
};

getWordbook().then(words => updateWords(words));
