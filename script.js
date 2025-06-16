var images = [
  "src/imagens/bobrossparrot.gif",
  "src/imagens/explodyparrot.gif",
  "src/imagens/fiestaparrot.gif",
  "src/imagens/metalparrot.gif",
  "src/imagens/revertitparrot.gif",
  "src/imagens/tripletsparrot.gif",
  "src/imagens/unicornparrot.gif"
];

var cards = [];
var cardStates = [];
var firstCardIndex = null;
var secondCardIndex = null;
var tries = 0;
var pairsFound = 0;
var totalPairs = 0;

function randomComparator() {
  return Math.random() - 0.5;
}

function startGame() {
  var numberOfCards = 0;
  while (
    numberOfCards < 4 ||
    numberOfCards > 14 ||
    numberOfCards % 2 !== 0 ||
    isNaN(numberOfCards)
  ) {
    numberOfCards = parseInt(prompt("How many cards do you want to play with? (even number between 4 and 14)"));
  }
  
  totalPairs = numberOfCards / 2;
  
  cards = [];
  for (var i = 0; i < totalPairs; i++) {
    cards.push(images[i]);
    cards.push(images[i]);
  }
  
  cards.sort(randomComparator);
  
  cardStates = [];
  for (var j = 0; j < cards.length; j++) {
    cardStates.push('closed');
  }
  
  firstCardIndex = null;
  secondCardIndex = null;
  tries = 0;
  pairsFound = 0;
  
  renderCards();
}

function renderCards() {
  var cardsContainer = document.querySelector('.cards');
  cardsContainer.innerHTML = '';
  
  for (var i = 0; i < cards.length; i++) {
    cardsContainer.innerHTML +=
      '<div class="card" onclick="flipCard(this, ' + i + ')">' +
        '<div class="front-face face">' +
          '<img src="' + cards[i] + '" />' +
        '</div>' +
        '<div class="back-face face">' +
          '<img src="src/imagens/back.png" />' +
        '</div>' +
      '</div>';
  }
}

function flipCard(cardElement, index) {
  if (cardStates[index] !== 'closed' || secondCardIndex !== null) {
    return;
  }
  

  cardElement.classList.add('active');
  cardStates[index] = 'open-temp';
  tries++;
  
  if (firstCardIndex === null) {
    firstCardIndex = index;
  } else {
    secondCardIndex = index;
    checkForMatch();
  }
}

function checkForMatch() {
  if (cards[firstCardIndex] === cards[secondCardIndex]) {
    cardStates[firstCardIndex] = 'open';
    cardStates[secondCardIndex] = 'open';
    pairsFound++;
    firstCardIndex = null;
    secondCardIndex = null;
    
    if (pairsFound === totalPairs) {
      setTimeout(gameWon, 500);
    }
  } else {

    setTimeout(closeCards, 1000);
  }
}

function closeCards() {
  var cardsDOM = document.querySelectorAll('.card');
  
  cardsDOM[firstCardIndex].classList.remove('active');
  cardsDOM[secondCardIndex].classList.remove('active');
  
  cardStates[firstCardIndex] = 'closed';
  cardStates[secondCardIndex] = 'closed';
  
  firstCardIndex = null;
  secondCardIndex = null;
}



function gameWon() {
  alert('You won in ' + tries + ' tries!');
}

startGame();
