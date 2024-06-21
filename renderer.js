document.addEventListener('DOMContentLoaded', function() {
  const totalRounds = localStorage.getItem('totalRounds');
  const savedSequenceWins = localStorage.getItem('sequenceWins');
  if (totalRounds) {
    document.getElementById('wins-container').classList.remove('hidden');
    document.getElementById('game-container').classList.remove('hidden');
    document.getElementById('sequence-container').classList.remove('hidden');
    sequenceWins = savedSequenceWins ? parseInt(savedSequenceWins) : 0;
    document.getElementById('sequence-wins').textContent = sequenceWins;
    startGame(parseInt(totalRounds));
  } else {
    window.location.href = 'menu.html';
  }
});

let deck = [];
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let gameOver = false;
let totalRounds = 1;
let currentRound = 0;
let playerWins = 0;
let dealerWins = 0;
let sequenceWins = 0;

function createDeck() {
  const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
}

function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function startGame(rounds) {
  totalRounds = rounds || 1;
  resetMatch();
  createDeck();
  shuffleDeck();
  dealCards();
  updateUI();
}

function dealCards() {
  playerHand.push(deck.pop());
  dealerHand.push(deck.pop());
  playerHand.push(deck.pop());
  dealerHand.push(deck.pop());
  calculateScores();
}

function calculateScores() {
  playerScore = calculateScore(playerHand);
  dealerScore = calculateScore(dealerHand);
}

function calculateScore(hand) {
  let score = 0;
  let numAces = 0;

  for (let card of hand) {
    if (card.value === 'A') {
      numAces++;
      score += 11;
    } else if (card.value === 'K' || card.value === 'Q' || card.value === 'J') {
      score += 10;
    } else {
      score += parseInt(card.value);
    }
  }

  while (score > 21 && numAces > 0) {
    score -= 10;
    numAces--;
  }

  return score;
}

function isBusted(score) {
  return score > 21;
}

function checkWinner() {
  if (isBusted(playerScore)) {
    return 'Dealer';
  } else if (isBusted(dealerScore)) {
    return 'Player';
  } else if (playerScore > dealerScore) {
    return 'Player';
  } else if (dealerScore > playerScore) {
    return 'Dealer';
  } else {
    return 'Tie';
  }
}

function displayCard(containerId, card) {
  const container = document.getElementById(containerId);
  const cardImage = document.createElement('img');
  cardImage.classList.add('card');
  cardImage.src = `public/cards/${card.value}_of_${card.suit}.png`;
  cardImage.alt = `${card.value} of ${card.suit}`;
  container.appendChild(cardImage);
}

function displayAllCards() {
  for (let card of playerHand) {
    displayCard('player-hand', card);
  }

  for (let card of dealerHand) {
    displayCard('dealer-hand', card);
  }
}

function updateUI() {
  document.getElementById('player-hand').innerHTML = '';
  document.getElementById('dealer-hand').innerHTML = '';
  displayAllCards();
  document.getElementById('player-score').textContent = `Player Score: ${playerScore}`;
  document.getElementById('dealer-score').textContent = `Dealer Score: ${dealerScore}`;
  document.getElementById('player-wins').textContent = playerWins;
  document.getElementById('dealer-wins').textContent = dealerWins;
  document.getElementById('sequence-wins').textContent = sequenceWins;
}

function nextRound() {
  deck = [];
  playerHand = [];
  dealerHand = [];
  playerScore = 0;
  dealerScore = 0;
  gameOver = false;
  document.getElementById('message').textContent = '';
  document.getElementById('overlay').classList.remove('show');
  document.getElementById('game-container').classList.remove('blur');
  createDeck();
  shuffleDeck();
  dealCards();
  updateUI();
}

function resetMatch() {
  currentRound = 0;
  playerWins = 0;
  dealerWins = 0;
}

function restartSeries() {
  resetMatch();
  startGame(totalRounds);
}

function showResultMessage(winner) {
  const overlay = document.getElementById('overlay');
  const resultMessage = document.getElementById('result-message');
  resultMessage.classList.remove('show');

  if (winner === 'Player') {
    resultMessage.textContent = 'Player Wins!';
    playerWins++;
  } else if (winner === 'Dealer') {
    resultMessage.textContent = 'Dealer Wins!';
    dealerWins++;
  } else {
    resultMessage.textContent = 'It\'s a tie!';
  }

  currentRound++;

  if (playerWins > totalRounds / 2 || dealerWins > totalRounds / 2) {
    if (playerWins > dealerWins) {
      resultMessage.textContent = `Player Wins the Match!`;
      sequenceWins++;
      localStorage.setItem('sequenceWins', sequenceWins);
    } else {
      resultMessage.textContent = `Dealer Wins the Match!`;
      sequenceWins = 0; // Reset sequence wins if the dealer wins the match
      localStorage.removeItem('sequenceWins');
    }

    document.getElementById('next-round-button').classList.add('hidden');
    document.getElementById('restart-button').classList.remove('hidden');
    document.getElementById('menu-button').classList.remove('hidden');
  } else {
    document.getElementById('next-round-button').classList.remove('hidden');
    document.getElementById('restart-button').classList.add('hidden');
    document.getElementById('menu-button').classList.add('hidden');
  }

  document.getElementById('game-container').classList.add('blur');
  overlay.classList.add('show');
  resultMessage.classList.add('show');
}

document.getElementById('hit-button').addEventListener('click', function() {
  if (!gameOver) {
    playerHand.push(deck.pop());
    calculateScores();
    updateUI();

    if (isBusted(playerScore)) {
      gameOver = true;
      document.getElementById('message').textContent = 'Player Busted! Dealer wins.';
      showResultMessage('Dealer');
    }
  }
});

document.getElementById('stand-button').addEventListener('click', function() {
  if (!gameOver) {
    while (dealerScore < 17) {
      dealerHand.push(deck.pop());
      calculateScores();
    }

    updateUI();

    const winner = checkWinner();
    if (winner === 'Player') {
      document.getElementById('message').textContent = 'Player wins!';
      showResultMessage('Player');
    } else if (winner === 'Dealer') {
      document.getElementById('message').textContent = 'Dealer wins!';
      showResultMessage('Dealer');
    } else {
      document.getElementById('message').textContent = 'It\'s a tie!';
      showResultMessage('Tie');
    }

    gameOver = true;
  }
});

document.getElementById('next-round-button').addEventListener('click', function() {
  nextRound();
});

document.getElementById('restart-button').addEventListener('click', function() {
  restartSeries();
  document.getElementById('restart-button').classList.add('hidden');
  document.getElementById('menu-button').classList.add('hidden');
  nextRound(); // Para iniciar a primeira rodada da série reiniciada
});

document.getElementById('menu-button').addEventListener('click', function() {
  localStorage.removeItem('sequenceWins');
  window.location.href = 'menu.html';
});
