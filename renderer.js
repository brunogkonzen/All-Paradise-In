document.addEventListener('DOMContentLoaded', function() {
  const totalRounds = localStorage.getItem('totalRounds') || 1;
  const savedSequenceWins = localStorage.getItem('sequenceWins') || 0;
  sequenceWins = parseInt(savedSequenceWins);
  document.getElementById('sequence-wins').textContent = sequenceWins;
  startGame(parseInt(totalRounds));

  document.getElementById('hit-button').addEventListener('click', hit);
  document.getElementById('stand-button').addEventListener('click', stand);
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
let roundResults = [];

function createDeck() {
  const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  deck = [];
  suits.forEach(suit => {
    values.forEach(value => {
      deck.push({value, suit});
    });
  });
}

function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function startGame(rounds) {
  totalRounds = rounds;
  currentRound = 0;
  playerWins = 0;
  dealerWins = 0;
  sequenceWins = parseInt(localStorage.getItem('sequenceWins') || 0);
  roundResults = [];
  gameOver = false;

  createDeck();
  shuffleDeck();
  playerHand = [];
  dealerHand = [];
  dealInitialCards();
  playerScore = calculateScore(playerHand);
  dealerScore = calculateScore(dealerHand);
  updateUI();
}

function dealInitialCards() {
  playerHand.push(deck.pop(), deck.pop());
  dealerHand.push(deck.pop(), deck.pop());
  updateUI();
}

function calculateScore(hand) {
  let score = 0;
  let aceCount = 0;
  hand.forEach(card => {
    if (card.value === 'A') {
      aceCount++;
      score += 11;
    } else if (['J', 'Q', 'K'].includes(card.value)) {
      score += 10;
    } else {
      score += parseInt(card.value);
    }
  });
  while (score > 21 && aceCount) {
    score -= 10;
    aceCount--;
  }
  return score;
}

function displayCards() {
  const playerContainer = document.getElementById('player-hand');
  const dealerContainer = document.getElementById('dealer-hand');
  playerContainer.innerHTML = '';
  dealerContainer.innerHTML = '';
  playerHand.forEach(card => playerContainer.appendChild(createCardElement(card)));
  dealerHand.forEach(card => dealerContainer.appendChild(createCardElement(card)));
}

function createCardElement(card) {
  const cardElement = document.createElement('img');
  cardElement.src = `public/cards/${card.value}_of_${card.suit}.png`;
  cardElement.alt = `${card.value} of ${card.suit}`;
  cardElement.className = 'card';
  return cardElement;
}

function updateUI() {
  displayCards();
  document.getElementById('player-score').textContent = `Player Score: ${playerScore}`;
  document.getElementById('dealer-score').textContent = `Dealer Score: ${dealerScore}`;
  document.getElementById('sequence-wins').style.backgroundColor = 'rgba(128, 128, 128, 0.8)';
  document.getElementById('sequence-wins').style.color = 'white';
  document.getElementById('sequence-wins').textContent = sequenceWins;
  updateLifeBar();
  toggleActionButtons(!gameOver);
}

function updateLifeBar() {
  const lifeBar = document.getElementById('player-wins-container');
  lifeBar.innerHTML = '';
  for (let i = 0; i < totalRounds; i++) {
    const lifeSquare = document.createElement('div');
    lifeSquare.className = 'life-square';
    lifeSquare.textContent = i + 1;
    if (roundResults[i] === 'win') {
      lifeSquare.classList.add('won');
    } else if (roundResults[i] === 'lose') {
      lifeSquare.classList.add('lost');
    }
    lifeBar.appendChild(lifeSquare);
  }
}

function toggleActionButtons(show) {
  document.getElementById('hit-button').classList.toggle('hidden', !show);
  document.getElementById('stand-button').classList.toggle('hidden', !show);
}

function hit() {
  if (!gameOver) {
    playerHand.push(deck.pop());
    playerScore = calculateScore(playerHand);
    updateUI();
    if (playerScore > 21) {
      gameOver = true;
      sequenceWins = 0;
      localStorage.setItem('sequenceWins', sequenceWins);
      document.getElementById('sequence-wins').textContent = sequenceWins;
      decideWinner();
    }
  }
}

function stand() {
  if (!gameOver) {
    while (dealerScore < 17) {
      dealerHand.push(deck.pop());
      dealerScore = calculateScore(dealerHand);
    }
    gameOver = true;
    updateUI();
    decideWinner();
  }
}

function decideWinner() {
  let winner;
  let messageColor = 'green';
  if (playerScore > 21) {
    winner = 'Dealer Wins!';
    messageColor = 'red';
    dealerWins++;
    roundResults[currentRound] = 'lose';
  } else if (dealerScore > 21 || playerScore > dealerScore) {
    winner = 'Player Wins!';
    playerWins++;
    roundResults[currentRound] = 'win';
  } else if (dealerScore > playerScore) {
    winner = 'Dealer Wins!';
    messageColor = 'red';
    dealerWins++;
    roundResults[currentRound] = 'lose';
  } else {
    winner = 'Tie!';
    messageColor = 'gray';
    roundResults[currentRound] = 'tie';
    displayEndGameMessage(winner, messageColor);

    setTimeout(() => {
      gameOver = false;
      playerHand = [];
      dealerHand = [];
      dealInitialCards();
      playerScore = calculateScore(playerHand);
      dealerScore = calculateScore(dealerHand);
      updateUI();
    }, 2000);
    return;
  }

  displayEndGameMessage(winner, messageColor);

  if ((totalRounds === 3 && dealerWins === 2) || (totalRounds === 5 && dealerWins === 2) || (totalRounds === 7 && dealerWins === 4)) {
    endSeries('Dealer Wins the Series!', 'red', false);
    return;
  }

  if ((totalRounds === 3 && playerWins === 2) || (totalRounds === 5 && playerWins === 3) || (totalRounds === 7 && playerWins === 4)) {
    endSeries('Player Wins the Series!', 'green', true);
    return;
  }

  if (currentRound < totalRounds - 1) {
    currentRound++;
    document.getElementById('next-round-button').classList.remove('hidden');
    document.getElementById('menu-button').classList.remove('hidden');
  } else {
    if (playerWins > dealerWins) {
      sequenceWins++;
      localStorage.setItem('sequenceWins', sequenceWins);
      document.getElementById('sequence-wins').textContent = sequenceWins;
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      updateLeaderboard(currentUser.name, sequenceWins);
      document.getElementById('new-series-button').classList.remove('hidden');
    } else {
      sequenceWins = 0;
      localStorage.setItem('sequenceWins', sequenceWins);
      document.getElementById('sequence-wins').textContent = sequenceWins;
      document.getElementById('restart-button').classList.remove('hidden');
    }
    document.getElementById('menu-button').classList.remove('hidden');
  }
}

function endSeries(message, color, playerWon) {
  const messageBox = document.getElementById('game-message');
  messageBox.textContent = message;
  messageBox.style.color = color;
  messageBox.style.display = 'block';

  if (playerWon) {
    document.getElementById('new-series-button').classList.remove('hidden');
  } else {
    document.getElementById('restart-button').classList.remove('hidden');
  }
  
  document.getElementById('menu-button').classList.remove('hidden');
  document.getElementById('next-round-button').classList.add('hidden');
  toggleActionButtons(false);
}

function displayEndGameMessage(winner, color) {
  const messageBox = document.getElementById('game-message');
  messageBox.textContent = winner;
  messageBox.style.display = 'block';
  messageBox.style.color = color;
  messageBox.style.backgroundColor = 'transparent';
  messageBox.style.textAlign = 'center';
  messageBox.style.position = 'fixed';
  messageBox.style.top = '20%';
  messageBox.style.left = '50%';
  messageBox.style.transform = 'translate(-50%, -20%)';

  if (totalRounds === 1) {
    if (winner === 'Player Wins!') {
      document.getElementById('new-series-button').classList.remove('hidden');
    } else {
      document.getElementById('restart-button').classList.remove('hidden');
    }
    document.getElementById('menu-button').classList.remove('hidden');
  } else {
    if (currentRound < totalRounds - 1) {
      if (winner !== 'Dealer Wins!') {
        document.getElementById('next-round-button').classList.remove('hidden');
      }
      document.getElementById('menu-button').classList.remove('hidden');
    } else {
      if (playerWins > dealerWins) {
        document.getElementById('new-series-button').classList.remove('hidden');
      } else {
        document.getElementById('restart-button').classList.remove('hidden');
      }
      document.getElementById('menu-button').classList.remove('hidden');
    }
  }

  toggleActionButtons(false);
}

document.getElementById('restart-button').addEventListener('click', function() {
  sequenceWins = 0;
  localStorage.setItem('sequenceWins', sequenceWins);
  document.getElementById('sequence-wins').textContent = sequenceWins;
  startGame(totalRounds);
  document.getElementById('restart-button').classList.add('hidden');
  document.getElementById('menu-button').classList.add('hidden');
  document.getElementById('new-series-button').classList.add('hidden');
  document.getElementById('game-message').style.display = 'none';
  document.getElementById('overlay').classList.add('hidden');
});

document.getElementById('menu-button').addEventListener('click', function() {
  sequenceWins = 0;
  localStorage.setItem('sequenceWins', sequenceWins);
  window.location.href = 'rounds.html';
});

document.getElementById('new-series-button').addEventListener('click', function() {
  startGame(totalRounds);
  document.getElementById('restart-button').classList.add('hidden');
  document.getElementById('menu-button').classList.add('hidden');
  document.getElementById('new-series-button').classList.add('hidden');
  document.getElementById('game-message').style.display = 'none';
  document.getElementById('overlay').classList.add('hidden');
});

document.getElementById('next-round-button').addEventListener('click', function() {
  gameOver = false;
  createDeck();
  shuffleDeck();
  playerHand = [];
  dealerHand = [];
  dealInitialCards();
  playerScore = calculateScore(playerHand);
  dealerScore = calculateScore(dealerHand);
  updateUI();
  document.getElementById('next-round-button').classList.add('hidden');
  document.getElementById('game-message').style.display = 'none';
});
