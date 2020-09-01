const getWordbook = async () => {
    return await fetch('http://localhost:3000/').then(response => response.json());
};
