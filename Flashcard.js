// Flashcard.js

// Data structure: Array of flashcard objects
let cards = []; // Each: { id: number, question: string, answer: string, mastered: boolean }

// State variables
let currentIndex = 0;
let filteredCards = cards; // Subset based on filter
let isFlipped = false; // Track flip state to reset on navigation

// DOM element references (cache for performance)
const cardCountEl = document.getElementById('card-count');
const filterButtons = document.querySelectorAll('#filter-buttons button');
const flashcardEl = document.querySelector('.flashcard');
const frontEl = document.querySelector('.flashcard-front');
const backEl = document.querySelector('.flashcard-back');
const actionButtons = document.getElementById('action-buttons');
const noCardsMessageEl = document.getElementById('no-cards-message');
const flipBtn = document.getElementById('flip-btn');
const nextBtn = document.getElementById('next-btn');
const masterBtn = document.getElementById('master-btn');
const questionInput = document.getElementById('question-input');
const answerInput = document.getElementById('answer-input');
const saveCardBtn = document.getElementById('save-card-btn');
const cancelBtn = document.getElementById('cancel-btn');

// Utility: Generate unique ID for cards
let nextId = 1;
function generateId() {
    return nextId++;
}

// Update the card display (front/back text, visibility, counts)
function updateCardDisplay() {
    const totalCards = cards.length;
    const unmasteredCards = cards.filter(card => !card.mastered).length;
    cardCountEl.textContent = `${totalCards} cards ${unmasteredCards} unmastered`;

    if (filteredCards.length === 0) {
        // Hide card and show message
        document.getElementById('current-card-container').style.display = 'none';
        actionButtons.style.display = 'none';
        noCardsMessageEl.style.display = 'block';
        return;
    }

    // Show card and buttons
    document.getElementById('current-card-container').style.display = 'block';
    actionButtons.style.display = 'flex';
    noCardsMessageEl.style.display = 'none';

    // Populate front and back with current card data
    const currentCard = filteredCards[currentIndex];
    frontEl.textContent = currentCard.question;
    backEl.textContent = currentCard.answer;

    // Reset flip state (ensure card starts face-up)
    isFlipped = false;
    flashcardEl.classList.remove('flipped');
}

// Filter cards based on selected filter
function filterCards(filter) {
    if (filter === 'all') {
        filteredCards = cards;
    } else if (filter === 'mastered') {
        filteredCards = cards.filter(card => card.mastered);
    } else if (filter === 'unmastered') {
        filteredCards = cards.filter(card => !card.mastered);
    }
    currentIndex = 0; // Reset to first card
    updateCardDisplay();
}

// Event: Flip button - Toggle the 'flipped' class for animation
flipBtn.addEventListener('click', () => {
    isFlipped = !isFlipped;
    flashcardEl.classList.toggle('flipped');
});

// Event: Next button - Move to next card, reset flip
nextBtn.addEventListener('click', () => {
    if (filteredCards.length > 1) {
        currentIndex = (currentIndex + 1) % filteredCards.length;
    }
    updateCardDisplay();
});

// Event: Mark mastered - Set current card to mastered, then next
masterBtn.addEventListener('click', () => {
    if (filteredCards.length > 0) {
        filteredCards[currentIndex].mastered = true;
        // Update the original cards array (since filteredCards is a reference)
        const originalIndex = cards.findIndex(card => card.id === filteredCards[currentIndex].id);
        if (originalIndex !== -1) {
            cards[originalIndex].mastered = true;
        }
        // Move to next (or wrap)
        if (filteredCards.length > 1) {
            currentIndex = (currentIndex + 1) % filteredCards.length;
        }
        updateCardDisplay();
    }
});

// Event: Filter buttons - Update active state and filter
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add to clicked
        button.classList.add('active');
        // Filter
        const filter = button.dataset.filter;
        filterCards(filter);
    });
});

// Event: Save new card
saveCardBtn.addEventListener('click', () => {
    const question = questionInput.value.trim();
    const answer = answerInput.value.trim();
    if (question && answer) {
        const newCard = {
            id: generateId(),
            question,
            answer,
            mastered: false
        };
        cards.push(newCard);
        // If current filter is 'all', update filteredCards; otherwise, keep as is
        if (document.querySelector('[data-filter="all"]').classList.contains('active')) {
            filteredCards = cards;
        }
        updateCardDisplay();
        // Clear inputs
        questionInput.value = '';
        answerInput.value = '';
    } else {
        alert('Please enter both a question and an answer.');
    }
});

// Event: Cancel new card
cancelBtn.addEventListener('click', () => {
    questionInput.value = '';
    answerInput.value = '';
});

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    updateCardDisplay(); // Show initial state (no cards message)
});
