let flashcards = [
    {
        question: "How many bones does a human body have?",
        answer: "206",
        image: "bone.jpg",
        mastered: true
    },
    {
        question: "What is the largest organ in human body?",
        answer: "Skin",
        image: "skin.jpeg",
        mastered: true
    },
    {
        question: "What is the nearest star in our Solar System?",
        answer: "Sun",
        image: "sun.jpg",
        mastered: true
    }
]; 

let currentCard = 0;
let filteredCards = [...flashcards];

const flashcard = document.getElementById('flashcard');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const cardImage = document.getElementById('card-image');
const userGuess = document.getElementById('user-guess');
const checkGuessBtn = document.getElementById('check-guess');
const nextCardBtn = document.getElementById('next-card');
const markMasteredBtn = document.getElementById('mark-mastered');
const filterSelect = document.getElementById('filter');
const showCreateFormBtn = document.getElementById('show-create-form');
const createForm = document.getElementById('create-card-form');
const newQuestionInput = document.getElementById('new-question');
const newAnswerInput = document.getElementById('new-answer');
const newImageInput = document.getElementById('new-image');
const hideCreateFormBtn = document.getElementById('hide-create-form-btn');

const mainControlsWrapper = document.querySelector('.main-controls-wrapper'); 


function displayCard() {
    if (filteredCards.length === 0) {
        questionEl.textContent = "No cards match the filter!";
        answerEl.textContent = "";
        cardImage.src = "bone.jpg";
        cardImage.style.display = "none";
        
        mainControlsWrapper.classList.add('hidden'); 
        return;
    }

    mainControlsWrapper.classList.remove('hidden');

    const card = filteredCards[currentCard];
    questionEl.textContent = card.question;
    answerEl.textContent = card.answer;

    if (card.image) {
        cardImage.src = card.image;
        cardImage.style.display = "block";
        cardImage.alt = "";
    } else {
        cardImage.src = "";
        cardImage.style.display = "none";
    }

    flashcard.classList.remove('is-flipped');
    userGuess.value = "";
    
    markMasteredBtn.textContent = card.mastered ? 'Unmark as Mastered' : 'Mark as Mastered';
}

function applyFilter() {
    const filter = filterSelect.value;

    if (filter === 'all') {
        filteredCards = [...flashcards];
    } else if (filter === 'unmastered') {
        filteredCards = flashcards.filter(card => !card.mastered);
    } else if (filter === 'mastered') {
        filteredCards = flashcards.filter(card => card.mastered);
    } 

    currentCard = 0;
    displayCard();
}

checkGuessBtn.addEventListener('click', () => {
    if (filteredCards.length === 0) return;
    const guess = userGuess.value.trim().toLowerCase();
    const card = filteredCards[currentCard];
    const correctAnswer = card.answer.toLowerCase();
    const originalIndex = flashcards.findIndex(c => c === card);
    
    if (guess === correctAnswer) {
        alert('Correct! Mark as Mastered');
        flashcards[originalIndex].mastered = true;
        markMasteredBtn.textContent = 'Unmark as Mastered';
    } else {
        alert('Incorrect! Mark as Unmastered');
        flashcards[originalIndex].mastered = false;
        markMasteredBtn.textContent = 'Mark as Mastered';
    }
   
    flashcard.classList.add('is-flipped');
});



markMasteredBtn.addEventListener('click', () => {
    if (!filteredCards.length) return;

    const originalIndex = flashcards.findIndex(card => card === filteredCards[currentCard]);
    flashcards[originalIndex].mastered = !flashcards[originalIndex].mastered;
    alert(flashcards[originalIndex].mastered ? 'Marked as Mastered!' : 'Unmarked as Mastered!');
    
    applyFilter();
});

nextCardBtn.addEventListener('click', () => {
    if (!filteredCards.length) return;

    currentCard = (currentCard + 1) % filteredCards.length;
    displayCard();
});

filterSelect.addEventListener('change', applyFilter);

showCreateFormBtn.addEventListener('click', () => {
    createForm.classList.remove('hidden');
});

createForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const question = newQuestionInput.value.trim();
    const answer = newAnswerInput.value.trim();
    const image = newImageInput.value.trim();

    if (!question || !answer) {
        alert("Please enter both question and answer.");
        return;
    }

    const newCard = {
        question,
        answer,
        image: image || "",
        mastered: false
    };

    flashcards.push(newCard); 

    newQuestionInput.value = "";
    newAnswerInput.value = "";
    newImageInput.value = "";
    createForm.classList.add('hidden');

    applyFilter();
    const indexInFiltered = filteredCards.indexOf(newCard);
    if (indexInFiltered !== -1) {
        currentCard = indexInFiltered;
        displayCard();
    }
});

hideCreateFormBtn.addEventListener('click', () => {
    createForm.classList.add('hidden');
});

applyFilter();
