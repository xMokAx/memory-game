/*
 * Create a list that holds all of your cards
 */
function createCardsList() {
    const cardList = [];
    for (let i = 0; i < 16; i++) {
        const card = document.createElement('li');
        card.classList.add('card');
        const cardHtml = document.createElement('i');
        switch (i) {
            case 0:
                cardHtml.classList.add('fa', 'fa-diamond');
                break;
            case 1:
                cardHtml.classList.add('fa', 'fa-paper-plane-o');
                break;
            case 2:
                cardHtml.classList.add('fa', 'fa-anchor');
                break;
            case 3:
                cardHtml.classList.add('fa', 'fa-bolt');
                break;
            case 4:
                cardHtml.classList.add('fa', 'fa-cube');
                break;
            case 5:
                cardHtml.classList.add('fa', 'fa-leaf');
                break;
            case 6:
                cardHtml.classList.add('fa', 'fa-bicycle');
                break;
            case 7:
                cardHtml.classList.add('fa', 'fa-bomb');
                break;
            case 8:
                cardHtml.classList.add('fa', 'fa-diamond');
                break;
            case 9:
                cardHtml.classList.add('fa', 'fa-paper-plane-o');
                break;
            case 10:
                cardHtml.classList.add('fa', 'fa-anchor');
                break;
            case 11:
                cardHtml.classList.add('fa', 'fa-bolt');
                break;
            case 12:
                cardHtml.classList.add('fa', 'fa-cube');
                break;
            case 13:
                cardHtml.classList.add('fa', 'fa-leaf');
                break;
            case 14:
                cardHtml.classList.add('fa', 'fa-bicycle');
                break;
            case 15:
                cardHtml.classList.add('fa', 'fa-bomb');
        }
        card.appendChild(cardHtml);
        cardList.push(card);
    }
    return cardList;
}
console.log(createCardsList());

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function displayCrads() {
    const shuffledCardList = shuffle(createCardsList());

    const fragment = document.createDocumentFragment();
    const cardsDeck = document.querySelector('.deck');

    shuffledCardList.forEach((card) => {
        fragment.appendChild(card);
    });

    cardsDeck.appendChild(fragment);
}

displayCrads();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
const cardsDeck = document.querySelector('.deck');
let openCardsList = [];
cardsDeck.addEventListener('click', (e) => {
    //check if the clicked element is li and that it has only the card class
    if (e.target.nodeName === 'LI' && e.target.classList.toString() === "card") {
        displayCardSymbol(e.target);
        createOpenCardsList(e.target);
        console.log(openCardsList);
        //check if the opensCardsList has more than one card and that its number of cards is an event number
        if (openCardsList.length > 1 && openCardsList.length % 2 === 0) {
            incrementMoves();
            decrementStars();
            console.log(openCardsList[1].childNodes[0].classList.toString());
            console.log(e.target.childNodes[0].classList.toString());
            //check if the added card has the same symbol as the last added before it
            if (e.target.childNodes[0].classList.toString() === openCardsList[1].childNodes[0].classList.toString()) {
                cardsMatched(e.target, openCardsList[1]);
                console.log(openCardsList);
            } else {
                hideCardSymbol(e.target);
                hideCardSymbol(openCardsList[0]);
                console.log(openCardsList);
            }
        }
    }

    if (openCardsList.length === 16) {
        displayWinMessage();
    }
});

//show the card symbol by adding these 2 classes
function displayCardSymbol(card) {
    card.classList.add('open', 'show');
}

//add the given card to the openCardsList
function createOpenCardsList(card) {
    openCardsList = [card].concat(openCardsList);
}

//hide the card symbol of the given card and delete it from the openCardsList
function hideCardSymbol(card) {
    openCardsList = openCardsList.filter((element) => card !== element);
    card.classList.add('wrong');
    setTimeout(() => {
        card.classList.remove('open', 'show', 'wrong');
    }, 1000);
}

//change the two given cards class to be match
function cardsMatched(card1, card2) {
    card1.classList.remove('open', 'show');
    card1.classList.add('match');
    card2.classList.remove('open', 'show');
    card2.classList.add('match');
}

//increment the moves counter
function incrementMoves() {
    const moves = document.querySelector('.moves');
    moves.textContent++;
}

//decrease the number of stars
function decrementStars() {
    const moves = document.querySelector('.moves');
    const stars = document.querySelectorAll('.fa-star');
    switch (moves.textContent) {
        case "7":
            stars[2].classList.remove('fa-star');
            stars[2].classList.add('fa-star-o');
            break;
        case "14":
            stars[1].classList.remove('fa-star');
            stars[1].classList.add('fa-star-o');
            break;
        case "21":
            stars[0].classList.remove('fa-star');
            stars[0].classList.add('fa-star-o');
    }
}

//show win screen with game summary
function displayWinMessage() {
    const numberOfMoves = document.querySelector('.moves').textContent;
    const winSummary = document.querySelector('.win-summary');
    const winScreen = document.querySelector('.win-screen');
    const starsCount = document.querySelectorAll('.fa-star').length;
    setTimeout(() => {
        winSummary.innerHTML = `with ${numberOfMoves} moves and ${starsCount} stars<br><span>Wooooooo!</span>`;
        winScreen.classList.remove('hidden');
    }, 1000);
}

//make the play again button restart the game by reloading the page on click
const playAgainButton = document.querySelector('.btn-reload');
playAgainButton.addEventListener('click', () => {
    window.location.reload();
});