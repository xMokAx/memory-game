/*
 * Create a list that holds all of your cards
 */

function createCardsList() {
    const cardList = [];
    for (let i = 0; i < 8; i++) {
        const card = document.createElement('li');
        card.classList.add('card');
        const cardHtml = document.createElement('i');
        cardHtml.classList.add('fa');
            switch(i) {
                case 0:
                    cardHtml.classList.add('fa-diamond');
                    break;
                case 1:
                    cardHtml.classList.add('fa-paper-plane-o');
                    break;
                case 2:
                    cardHtml.classList.add('fa-anchor');
                    break;
                case 3:
                    cardHtml.classList.add('fa-bolt');
                    break;
                case 4:
                    cardHtml.classList.add('fa-cube');
                    break;
                case 5:
                    cardHtml.classList.add('fa-leaf');
                    break;
                case 6:
                    cardHtml.classList.add('a-bicycle');
                    break;
                case 7:
                    cardHtml.classList.add('fa-bomb');
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

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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
