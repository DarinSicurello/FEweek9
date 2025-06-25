/* WEEK 9Coding Steps:

For the final project you will be creating an automated version of the classic card game WAR! There are many versions of the game WAR. In this version there are only 2 players.
You do not need to do anything special when there is a tie in a round.
Think about how you would build this project and write your plan down. Consider classes such as: Card, Deck, Player, as well as what properties and methods they may include.
// Four suits to represent the appearance (user interface - ui) for your cards
let cardSuits = ["Spades 🗡️", "Hearts ❤️", "Diamonds 💎", "Clubs 🍀"];
console.log("Card Suits Example:", cardSuits);
 

The game itself will automatically play using console.log() to display turns, points, cards used, and the outcome of the game. No user input via prompts is required.
 

The completed project should, when executed, do the following:

Deal 26 Cards to each Player from a Deck of 52 cards.
Iterate through the turns where each Player plays a Card.
The Player who played the higher card is awarded a point.
-Ties result in zero points for both Players.
After all cards have been played, display the score and declare the winner.
 

The following is extra credit (10pts)

 

Write a Unit Test using Mocha and Chai for at least one of the functions you write.
 

Note Mocha/Chai: The Mocha/Chai framework recently removed Common JS functionality, you will need to use these specific versions in order to follow the video:

chai: "^4.3.10"
mocha: "^10.2.0"

You can use this boiler plate project for your unit testing:
Mocha/Chai Github Repository */



// v2 Add score  I had to convert String "A" aka ACE to a number value to create a score value

const cardValues = {
  "A": 14,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  "J": 11,
  "Q": 12,
  "K": 13
};


// This establishes the functions of the cards, card styles, and card numbers

let cardSuits = ["Spades 🗡️", "Hearts ❤️", "Diamonds 💎", "Clubs 🍀"];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

function createDeck() {
  const deck = [];
  for (let suit of cardSuits) {
    for (let rank of ranks) {
      deck.push(`${rank} of ${suit}`);
    }
  }
  return deck;
}

// Establishing Card Values Using SPlit and Extract rank and get value

function getCardValue(card) {
  const rank = card.split(" ")[0]; 
  return cardValues[rank];
}


function compareCards(card1, card2) {
  const val1 = getCardValue(card1);
  const val2 = getCardValue(card2);

  if (val1 > val2) return "Player 1 wins this round";
  if (val2 > val1) return "Player 2 wins this round";
  return "Tie!";
}

// v2 Adding Total Score Points values to the Players Cards

function getTotalScore(cards) {
  let total = 0;
  for (let card of cards) {
    total += getCardValue(card);
  }
  return total;
}

function compareTotalScores(playerCards1, playerCards2) {
  const val1 = getTotalScore(playerCards1);
  const val2 = getTotalScore(playerCards2);

  if (val1 > val2) {
    return `Player 1 => ${val1} total vs. Player 2 => ${val2} — Player 1 Wins!`;
  }
  if (val2 > val1) {
    return `Player 1 => ${val1} total vs. Player 2 => ${val2} — Player 2 Wins!`;
  }
  return `Player 1 => ${val1} vs. Player 2 => ${val2} — Tie game!`;
}

// Deal 26 cards (52 / 2) to each player
function dealCards(deck) {
  const playerCards1 = [];
  const playerCards2 = [];

  // Deal cards to players
  for (let i = 0; i < 26; i++) {
    playerCards1.push(deck.pop());
    playerCards2.push(deck.pop());
  }

  return { playerCards1, playerCards2 };
}

// Shuffle Deck
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap the cards
  }
}

// Display Cards and Create Card Container  VIA DOM (fix Null error with if)

function displayCards(containerId, cards) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Element with id "${containerId}" not found.`);
    return;
  }

  container.innerHTML = "";

  cards.forEach(card => {
    const div = document.createElement("div");
    div.className = "card";
    div.textContent = card;
    container.appendChild(div);
  });
} // <-- closing displayCards

// v2 Need to create a function for the display score container 

function displayScoreResult(text) {
  const scoreContainer = document.getElementById("score-result");
  if (!scoreContainer) {
    console.error('Element with id "score-result" not found.');
    return;
  }
  scoreContainer.innerHTML = text;
}

// v2 Deal game fucntion..merging Players 1 * Players 2

function dealGame() {
  let deck = createDeck();
  shuffleDeck(deck);
  const { playerCards1, playerCards2 } = dealCards(deck);

  displayCards("player1-cards", playerCards1);
  displayCards("player2-cards", playerCards2);

  const roundResult = compareCards(playerCards1[0], playerCards2[0]);
  const totalResult = compareTotalScores(playerCards1, playerCards2);

  const finalResultText = `${roundResult}<br>${totalResult}`;
  displayScoreResult(finalResultText);
}
