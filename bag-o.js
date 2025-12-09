let flashcards = [
    {
        question: "How many bones does a human body have?",
        answer: "206",
        image: "bone.jpg",
        mastered: false
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
        image: "",
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
const flipCardBtn = document.getElementById('flip-card');
const markMasteredBtn = document.getElementById('mark-mastered');
const filterSelect = document.getElementById('filter');
const showCreateFormBtn = document.getElementById('show-create-form');
const createForm = document.getElementById('create-card-form');
const newQuestionInput = document.getElementById('new-question');
const newAnswerInput = document.getElementById('new-answer');
const newImageInput = document.getElementById('new-image');
const hideCreateFormBtn = document.getElementById('hide-create-form-btn');
const masteryControls = document.getElementById('mastery-controls');

function displayCard() {
    if (filteredCards.length === 0) {
        questionEl.textContent = "No cards match the filter!";
        answerEl.textContent = "";
        cardImage.src = "";
        cardImage.style.display = "none";
        masteryControls.classList.add('hidden');
        return;
    }

    const card = filteredCards[currentCard];
    questionEl.textContent = card.question;
    answerEl.textContent = card.answer;

    if (card.image) {
        cardImage.src = card.image;
        cardImage.style.display = "block";
        cardImage.alt = "Card Image";
    } else {
        cardImage.src = "";
        cardImage.style.display = "none";
    }

    flashcard.classList.remove('is-flipped');
    userGuess.value = "";
    masteryControls.classList.remove('hidden');

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

// AUTO‑MASTER / UNMASTER ON GUESS
checkGuessBtn.addEventListener('click', () => {
    if (!filteredCards.length) return;

    const guess = userGuess.value.trim().toLowerCase();
    const card = filteredCards[currentCard];
    const correctAnswer = card.answer.toLowerCase();

    const originalIndex = flashcards.findIndex(c => c === card);

    if (guess === correctAnswer) {
        alert('Correct!');
        flashcard.classList.add('is-flipped');
        flashcards[originalIndex].mastered = true;          // auto mark mastered
        markMasteredBtn.textContent = 'Unmark as Mastered';
    } else {
        alert('Incorrect! Try again.');
        flashcards[originalIndex].mastered = false;         // auto mark unmastered
        markMasteredBtn.textContent = 'Mark as Mastered';
    }

    applyFilter();  // keep Mastered/Unmastered filters accurate
});

flipCardBtn.addEventListener('click', () => {
    flashcard.classList.toggle('is-flipped');
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
