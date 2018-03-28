
 //List of cards
let cardsList = ['fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-leaf','fa-bicycle','fa-bomb'];
let deck = document.querySelector('.deck');
let open = [];
cardsList = cardsList.concat(cardsList); //each card appears twice
let counter = 0;


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

function prepareDeck(){ // shuffle and assign classes
shuffle(cardsList);
let deckLi = deck.getElementsByTagName('li');
for (let i=0; i<deckLi.length; i++) {
  deckLi[i].querySelector('i').classList = "fa " + cardsList[i];
}
}

function showCard(card){
  card.classList.add("open", "show");
}

function hideCard(card1, card2){
    open.length = 0; //clear array
    setTimeout(function() {
    card1.classList.remove("open", "show");
    card2.classList.remove("open", "show");
  }, 800);
  }

function checkCard(currentCard){
if (open.length > 1) { //two cards to compare
  let recentOpen = open[1]; //card added before current
    if (recentOpen.children[0].className === currentCard.children[0].className) { //see if they have the same icons
      matchCard(currentCard);
      matchCard(recentOpen); //mark both of them as matched
    }
    else {
      hideCard(currentCard, recentOpen); //if cards not match, hide both
    }
    }
}
function matchCard(matched) {
  setTimeout(function() {
  matched.classList.add("match", "match-effect");
  matched.classList.remove("open", "show");
  setTimeout(function() {
      matched.classList.remove("match-effect");
  }, 1000)
}, 1000);
}

function countMoves() {
  counter += 1;
  document.querySelector(".moves").textContent = counter;
}

prepareDeck(); //mix and display cards

deck.addEventListener("click", function(event){
  let target = event.target;
  if (!(target.classList.contains("match") || target.classList.contains("show")) && target.tagName === "LI") { //exclude other clicks than on li and with class open or match
    open.unshift(target); //add clicked card to array
    showCard(target);
    checkCard(target);
    countMoves();
}

})
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
