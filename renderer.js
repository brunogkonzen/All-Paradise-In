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
  document.getElementById('sequence-wins').style.backgroundColor = 'rgba(128, 128, 128, 0.8)'; // Fundo cinza
  document.getElementById('sequence-wins').style.color = 'white'; // Texto em branco
  toggleActionButtons(!gameOver);
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
      sequenceWins = 0; // Reiniciar sequ?ncia de vitórias ao perder
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
    updateUI();
    gameOver = true;
    decideWinner();
  }
}

function decideWinner() {
  let winner;
  let messageColor = 'green'; // Cor padr?o para vitória do jogador
  if (playerScore > 21) {
    winner = 'Dealer Wins!';
    messageColor = 'red'; // O dealer ganha se o jogador estourar 21
    dealerWins++;
  } else if (dealerScore > 21 || playerScore > dealerScore) {
    winner = 'Player Wins!';
    playerWins++;
  } else if (dealerScore > playerScore) {
    winner = 'Dealer Wins!';
    messageColor = 'red'; // O dealer ganha se tiver uma pontua??o maior
    dealerWins++;
  } else {
    winner = 'Tie!'; // Empate
    messageColor = 'gray'; // Cor para empate
  }

  displayEndGameMessage(winner, messageColor);

  if (currentRound < totalRounds - 1) {
    currentRound++;
    document.getElementById('next-round-button').classList.remove('hidden');
  } else {
    if (playerWins > dealerWins) {
      sequenceWins++;
      localStorage.setItem('sequenceWins', sequenceWins);
      document.getElementById('sequence-wins').textContent = sequenceWins;
      document.getElementById('new-series-button').classList.remove('hidden');
    } else {
      sequenceWins = 0; // Reiniciar sequ?ncia de vitórias ao perder a série
      localStorage.setItem('sequenceWins', sequenceWins);
      document.getElementById('sequence-wins').textContent = sequenceWins;
      document.getElementById('restart-button').classList.remove('hidden');
    }
    document.getElementById('menu-button').classList.remove('hidden');
  }
}

function displayEndGameMessage(winner, color) {
  const messageBox = document.getElementById('game-message');
  messageBox.textContent = winner;
  messageBox.style.display = 'block';
  messageBox.style.color = color; // Ajustar a cor do texto
  messageBox.style.backgroundColor = 'transparent'; // Remover o fundo do message box
  messageBox.style.textAlign = 'center'; // Centralizar o texto
  messageBox.style.position = 'fixed'; // Posi??o fixa
  messageBox.style.top = '20%'; // Ajustar para a posi??o em cima
  messageBox.style.left = '50%'; // Centralizar horizontalmente
  messageBox.style.transform = 'translate(-50%, -20%)'; // Ajustar para centraliza??o

  // Remover os botões de HIT e STAND
  document.getElementById('hit-button').classList.add('hidden');
  document.getElementById('stand-button').classList.add('hidden');
}

document.getElementById('restart-button').addEventListener('click', function() {
  sequenceWins = 0; // Reiniciar sequ?ncia de vitórias ao reiniciar
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
  sequenceWins = 0; // Reiniciar sequ?ncia de vitórias
  localStorage.setItem('sequenceWins', sequenceWins);
  window.location.href = 'menu.html';
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
