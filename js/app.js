//List of cards
let cardsList = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];
let deck = document.querySelector('.deck'); //do I need it?
let open = [];
let movesCounter = 0;
let countMatched = 0;
let overlay = document.querySelector(".overlay");
let countClicks = 0
let timerId;
cardsList = cardsList.concat(cardsList); //each card appears twice

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

function prepareDeck() { // shuffle and assign classes
  shuffle(cardsList);
  let deckLi = deck.getElementsByTagName('li');
  for (let i = 0; i < deckLi.length; i++) {
    deckLi[i].querySelector('i').classList = "fa " + cardsList[i];
  }
}

function showCard(card) {
  card.classList.add("open", "show");
}

function hideCard(card1, card2) {
  open.length = 0; //clear array
  setTimeout(function() {
    card1.classList.remove("open", "show");
    card2.classList.remove("open", "show");
  }, 800);
}

function checkCard(currentCard) {
  if (open.length === 2) { //two cards to compare
    countMoves(); //one move = two cards
    let recentOpen = open[1]; //card added before current
    if (recentOpen.children[0].className === currentCard.children[0].className) { //see if they have the same icons
      matchCard(currentCard);
      matchCard(recentOpen); //mark both of them as matched
    } else {
      hideCard(currentCard, recentOpen); //if cards not match, hide both
    }
  }
}

function matchCard(matched) {
  countMatched += 1;
  open.length = 0;
  setTimeout(function() {
    matched.classList.add("match", "match-effect");
    matched.classList.remove("open", "show");
    setTimeout(function() {
      matched.classList.remove("match-effect");
    }, 1000)
    if (countMatched === 16) {
      gameCompleted();
    }
  }, 1000);
}

function countMoves() {
  movesCounter += 1;
  let step = 10;
  const movesLabel = document.querySelector(".moves-label");
  if (movesCounter === 1) {
    movesLabel.textContent = "Move";
  } else {
    movesLabel.textContent = "Moves";
  }
  document.querySelector(".moves").textContent = movesCounter;
  if (movesCounter % step === 0 && movesCounter <= step * 3) { //remove star each amount of points defined in step (no more than 3 times)
    document.querySelector(".stars").children[0].remove();
  }
}

function timing(start) {
  timerId = setInterval(function() {
    now = Date.now();
    elapsedTime = Math.floor((now - start) / 1000);
    document.querySelector(".time").textContent = elapsedTime;
  }, 1000);

}

function gameCompleted() {
  overlay.style.display = "block";
  clearInterval(timerId);
  let stars = document.querySelector(".stars").innerHTML;
  document.querySelector(".result-stars").innerHTML = stars;
  document.querySelector(".result-moves").textContent = movesCounter;
  document.querySelector(".result-time").textContent = elapsedTime;
}






prepareDeck(); //mix and display cards

deck.addEventListener("click", function(event) {
  let target = event.target;
  if (!(target.classList.contains("match") || target.classList.contains("show")) && target.tagName === "LI") { //exclude other clicks than on li and with class open or match
    open.unshift(target); //add clicked card to array
    countClicks += 1;
    if (countClicks === 1) {
      start = Date.now();
      timing(start);
    }
    showCard(target);
    checkCard(target);
  }

});

document.querySelector(".btn-close").addEventListener("click", function() {
  overlay.style.display = "none";
});

document.querySelector(".restart").addEventListener("click", function() {
  open.length = 0;
  movesCounter = 0;
  countMatched = 0;
  countClicks = 0;
  document.querySelector(".moves").textContent = movesCounter;
  clearInterval(timerId);
  document.querySelector(".time").textContent = 0;
  document.querySelector(".stars").innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
  let children = document.querySelector(".deck").children;
  for (let i = 0; i < children.length; i++) {
    children[i].classList.remove("open", "show", "match");
  }
  prepareDeck();

});
