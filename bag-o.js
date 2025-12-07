document.addEventListener('DOMContentLoaded', () => {
    const flashcards =[
 { question: 'What is the capital of Philippines?', answer: 'Manila', image:'Manila.jpeg' },
{ question: 'What is the Largest organ in Human body?', answer: 'Skin', image: 'skin.jpeg' },
{ question: 'What is the nearest star in our solar system?', answer: 'Sun', image: 'sun.jpg' },
];

let currentCard = 0;

const flashcardElement = document.getElementById('flashcard');
const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer');
const imageElement = document.getElementById('card-image');


function displayCard() {
    const cardData = flashcards[currentCard];

    questionElement.textContent = cardData.question;
    answerElement.textContent = cardData.answer;
    imageElement.src = cardData.image;
    // We only remove 'is-flipped' when showing a *new* card, not during the flip action itself.
    flashcardElement.classList.remove('is-flipped'); 
}

document.getElementById('flip-card').addEventListener('click', () => {
    // FIX 3: Removed displayCard() call from here. We only want to toggle the class!
    flashcardElement.classList.toggle('is-flipped'); 
});

document.getElementById('next-card').addEventListener('click', () => {
    currentCard = (currentCard + 1) % flashcards.length;
    displayCard();
})
displayCard();

});