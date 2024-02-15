export class WordProvider {

    wordWidth = (word, sentenceLength, sentenceWidth) => {
        return (word.length / sentenceLength) * sentenceWidth;
    }
}