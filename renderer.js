// Vari?veis globais
let deck = [];
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let gameOver = false;

// Fun??o para criar um baralho de cartas
function createDeck() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
}

// Fun??o para embaralhar o baralho
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Fun??o para iniciar o jogo
function startGame() {
    createDeck();
    shuffleDeck();
    dealCards();
    updateUI();
}

// Fun??o para distribuir as cartas
function dealCards() {
    playerHand.push(deck.pop());
    dealerHand.push(deck.pop());
    playerHand.push(deck.pop());
    dealerHand.push(deck.pop());
    calculateScores();
}

// Fun??o para calcular a pontua??o das m?os
function calculateScores() {
    playerScore = calculateScore(playerHand);
    dealerScore = calculateScore(dealerHand);
}

// Fun??o para calcular a pontua??o de uma m?o
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

// Fun??o para verificar se um jogador estourou (busted)
function isBusted(score) {
    return score > 21;
}

// Fun??o para verificar o vencedor do jogo
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

// Fun??o para atualizar a interface do usu?rio
function updateUI() {
    document.getElementById('player-hand').innerHTML = '';
    document.getElementById('dealer-hand').innerHTML = '';

    for (let card of playerHand) {
        const cardElement = document.createElement('div');
        cardElement.textContent = `${card.value} of ${card.suit}`;
        document.getElementById('player-hand').appendChild(cardElement);
    }

    for (let card of dealerHand) {
        const cardElement = document.createElement('div');
        cardElement.textContent = `${card.value} of ${card.suit}`;
        document.getElementById('dealer-hand').appendChild(cardElement);
    }

    document.getElementById('player-score').textContent = `Player Score: ${playerScore}`;
    document.getElementById('dealer-score').textContent = `Dealer Score: ${dealerScore}`;
}

// Fun??o para reiniciar o jogo
function restartGame() {
    deck = [];
    playerHand = [];
    dealerHand = [];
    playerScore = 0;
    dealerScore = 0;
    gameOver = false;
    document.getElementById('message').textContent = '';
    startGame();
}

// Event listener para o bot?o "Hit"
document.getElementById('hit-button').addEventListener('click', function() {
    if (!gameOver) {
        playerHand.push(deck.pop());
        calculateScores();
        updateUI();

        if (isBusted(playerScore)) {
            gameOver = true;
            document.getElementById('message').textContent = 'Player Busted! Dealer wins.';
        }
    }
});

// Event listener para o bot?o "Stand"
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
        } else if (winner === 'Dealer') {
            document.getElementById('message').textContent = 'Dealer wins!';
        } else {
            document.getElementById('message').textContent = 'It\'s a tie!';
        }

        gameOver = true;
    }
});

// Event listener para o bot?o "Restart"
document.getElementById('restart-button').addEventListener('click', function() {
    restartGame();
});

// Iniciar o jogo
startGame();
