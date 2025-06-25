// this my starting code for the Static working script without CSS

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

// 

function compareCards(card1, card2) {
  const val1 = getCardValue(card1);
  const val2 = getCardValue(card2);

  if (val1 > val2) return "Player 1 wins this round";
  if (val2 > val1) return "Player 2 wins this round";
  return "Tie!";
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

// Deal game function..
function dealGame() {
  let deck = createDeck(); 
  shuffleDeck(deck);        
  const hands = dealCards(deck); 

  // Displaying Players Cards (moved inside so 'hands' is defined)
  console.log("Player 1 ", hands.playerCards1);
  console.log("Player 2 ", hands.playerCards2);
}

// Call the main game function to deal the cards
dealGame();

