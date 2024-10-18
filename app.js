// app.js

console.log('Script started');

// Declare these variables in the global scope
let flashcards = [];
let classes = [];
let currentClass = null;
let filteredFlashcards = [];
let currentCardIndex = 0;
let showKnown = true;
const knownCards = new Set();

// Declare UI elements in the global scope
let classList, flashcardSection, classSelectionSection, flashcardContent, 
    cardNumberElem, progressBar, progressText, knownBtn, dontKnowBtn, 
    flipCardBtn, homeBtn, showKnownToggle;

// Function to load flashcards
async function loadFlashcards() {
    console.log('Loading flashcards...');
    try {
        const response = await fetch('questions.json');
        console.log('Fetch response:', response);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Parsed JSON data:', data);

        // Parse the JSON data and build flashcards array
        flashcards = parseFlashcards(data);
        console.log('Parsed flashcards:', flashcards);
        classes = [...new Set(flashcards.map(card => card.class))];
        console.log('Extracted classes:', classes);
        showClassSelection();
    } catch (error) {
        console.error("Error loading flashcards:", error);
        alert('Error loading flashcards. Please check the console for details.');
    }
}

// Function to parse flashcards
function parseFlashcards(data) {
    let cards = [];
    for (const course in data) {
        for (const courseTitle in data[course]) {
            const weeks = data[course][courseTitle];
            for (const week in weeks) {
                weeks[week].forEach(card => {
                    cards.push({
                        id: card.question_id,
                        class: courseTitle,
                        question: card.question,
                        answer: Array.isArray(card.answer) ? card.answer.join('\n') : card.answer
                    });
                });
            }
        }
    }
    return cards;
}

// Function to show class selection
function showClassSelection() {
    console.log('Showing class selection');
    classSelectionSection.classList.remove('hidden');
    flashcardSection.classList.add('hidden');
    homeBtn.classList.add('hidden');
    knownCards.clear();
    classList.innerHTML = '';
    console.log('Number of classes:', classes.length);
    classes.forEach(cls => {
        console.log('Adding class:', cls);
        const classItem = document.createElement('button');
        classItem.classList.add('class-item', 'btn');
        classItem.textContent = cls;
        classItem.addEventListener('click', () => startFlashcards(cls));
        classList.appendChild(classItem);
    });
}

// Function to start flashcards
function startFlashcards(selectedClass) {
    currentClass = selectedClass;
    filteredFlashcards = flashcards.filter(card => card.class === selectedClass);
    currentCardIndex = 0;
    classSelectionSection.classList.add('hidden');
    flashcardSection.classList.remove('hidden');
    homeBtn.classList.remove('hidden');
    updateCard();
}

// Function to update card display
function updateCard() {
    if (currentCardIndex < filteredFlashcards.length) {
        const card = filteredFlashcards[currentCardIndex];
        flashcardContent.innerHTML = `
            <div class="front">${card.question}</div>
            <div class="back">${card.answer}</div>
        `;
        cardNumberElem.textContent = `Card ${currentCardIndex + 1} of ${filteredFlashcards.length}`;
        updateProgress();
        resetCardState();
        
        // Add animation class
        flashcardContent.classList.add('new-card');
        setTimeout(() => flashcardContent.classList.remove('new-card'), 300);
    } else {
        finishFlashcards();
    }
}

// Function to reset card state
function resetCardState() {
    flashcardContent.classList.remove('show-answer', 'flipped'); // Remove 'flipped' class
    knownBtn.disabled = false;
    dontKnowBtn.disabled = false;
    flipCardBtn.textContent = 'Show Answer';
}

// Function to flip card
function flipCard() {
    flashcardContent.classList.toggle('flipped');
    if (flashcardContent.classList.contains('flipped')) {
        flipCardBtn.textContent = 'Show Question';
    } else {
        flipCardBtn.textContent = 'Show Answer';
    }
}

// Function to move to next card
function nextCard() {
    currentCardIndex++;
    updateCard();
}

// Function to update progress
function updateProgress() {
    const progress = ((currentCardIndex + 1) / filteredFlashcards.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${currentCardIndex + 1} / ${filteredFlashcards.length}`;
}

// Function to finish flashcards
function finishFlashcards() {
    flashcardContent.textContent = "You've completed all flashcards for this class!";
    knownBtn.disabled = true;
    dontKnowBtn.disabled = true;
    flipCardBtn.disabled = true;
}

// Main initialization
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    
    // Initialize UI elements
    classList = document.getElementById('class-list');
    flashcardSection = document.getElementById('flashcard-section');
    classSelectionSection = document.getElementById('class-selection');
    flashcardContent = document.getElementById('flashcard-content');
    cardNumberElem = document.getElementById('card-number');
    progressBar = document.getElementById('progress-bar').children[0];
    progressText = document.getElementById('progress-text');
    knownBtn = document.getElementById('known-btn');
    dontKnowBtn = document.getElementById('dont-know-btn');
    flipCardBtn = document.getElementById('flip-card-btn');
    homeBtn = document.getElementById('home-btn');
    showKnownToggle = document.getElementById('show-known-toggle');

    // Log all the important elements
    console.log('classList:', classList);
    console.log('flashcardSection:', flashcardSection);
    console.log('classSelectionSection:', classSelectionSection);

    // Add event listeners only if the elements exist
    if (flipCardBtn) flipCardBtn.addEventListener('click', flipCard);
    if (knownBtn) knownBtn.addEventListener('click', () => {
        knownCards.add(filteredFlashcards[currentCardIndex].id);
        flashcardContent.classList.add('known');
        setTimeout(() => {
            nextCard();
            flashcardContent.classList.remove('known');
        }, 300);
    });
    if (dontKnowBtn) dontKnowBtn.addEventListener('click', () => {
        flashcardContent.classList.add('dont-know');
        setTimeout(() => {
            nextCard();
            flashcardContent.classList.remove('dont-know');
        }, 300);
    });
    if (homeBtn) homeBtn.addEventListener('click', showClassSelection);
    if (showKnownToggle) showKnownToggle.addEventListener('change', () => {
        showKnown = showKnownToggle.checked;
        // Implement logic to filter known cards if needed
    });

    // Load flashcards
    loadFlashcards();
});
