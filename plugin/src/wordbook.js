const getWordbook = async () => {
    return await fetch('http://localhost:8080/').then(response => response.json());
};
