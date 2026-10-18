const fruits = [
  { name: "apple", symbol: "🍎" },
  { name: "banana", symbol: "🍌" },
  { name: "cherry", symbol: "🍒" },
  { name: "coconut", symbol: "🥥" },
  { name: "grapes", symbol: "🍇" },
  { name: "mango", symbol: "🥭" },
  { name: "pineapple", symbol: "🍍" },
  { name: "watermelon", symbol: "🍉" },
];
 
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
 
const board = document.querySelector("#board");
const movesDisplay = document.querySelector("#moves");
const status = document.querySelector("#status");
const newGameButton = document.querySelector("#new-game");
 
let deck = [];          
let turnedCards = [];   
let moves = 0;
let pairsFound = 0;
let waiting = false;    
let timerId = null;     
 
function buildBoard() {
  deck = shuffle([...fruits, ...fruits]);
 
  for (let i = 0; i < deck.length; i++) {
    const card = document.createElement("button");
    card.type = "button";
    card.classList.add("card");
    card.setAttribute("aria-label", `Card ${i + 1}, face down`);
    card.dataset.index = i;
    board.appendChild(card);
  }
}

function buildBoard() {
  deck = shuffle([...fruits, ...fruits]);
 
  for (let i = 0; i < deck.length; i++) {
    const card = document.createElement("button");
    card.type = "button";
    card.classList.add("card");
    card.setAttribute("aria-label", `Card ${i + 1}, face down`);
    card.dataset.index = i;
    board.appendChild(card);
  }
}

function checkForMatch() {
  moves++;
  movesDisplay.textContent = moves;
 
  const [first, second] = turnedCards;
  const firstFruit = deck[Number(first.dataset.index)];
  const secondFruit = deck[Number(second.dataset.index)];
 
  if (firstFruit.name === secondFruit.name) {
    first.classList.add("matched");
    second.classList.add("matched");
    first.disabled = true;
    second.disabled = true;
    status.textContent = "That's a pair!";
    turnedCards = [];
    pairsFound++;

function turnFaceUp(card) {
  const index = Number(card.dataset.index);
  const fruit = deck[index];
  card.textContent = fruit.symbol;
  card.classList.add("flipped");
  card.setAttribute("aria-label", `Card ${index + 1}, ${fruit.name}`);
}

    if (pairsFound === fruits.length) {
      status.textContent = `You found all the pairs in ${moves} moves!`;
      status.classList.add("you-won");
    }
  } else {
    status.textContent = "Not a pair. Try again.";
    waiting = true;
    timerId = setTimeout(function () {
      turnFaceDown(first);
      turnFaceDown(second);
      turnedCards = [];
      waiting = false;
    }, 1000);
  }
}

board.addEventListener("click", function (event) {
  const card = event.target;
 
  if (!card.classList.contains("card")) return;   
  if (waiting) return;                            
  if (card.classList.contains("flipped")) return; 
 
  turnFaceUp(card);
  turnedCards.push(card);
 
  if (turnedCards.length === 2) {
    checkForMatch();
  }
});

newGameButton.addEventListener("click", newGame);

buildBoard();