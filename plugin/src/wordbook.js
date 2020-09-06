const getWordbook = async () => {
    return await fetch('http://localhost:3000/').then(response => response.json());
};

// getWordbook().then(json => {
//     const config = {method: '', headers: {'Content-Type': 'application/json;charset=utf-8'}, body: ''};
//     config.method = 'post';
//     const terms = [];
//     for (const row of json) {
//         const value = row.word;
//         const translation = row.translate;
//         const definition = row.definition;
//         const term = {
//             value,
//             userId: 'none',
//         };
//         terms.push(term);
//     }
//     config.body = JSON.stringify(terms);
//     fetch('http://localhost:8080/terms/create/list/', config);
// });
