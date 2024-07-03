// menu.js
document.addEventListener('DOMContentLoaded', function() {
    const startGameButton = document.getElementById('start-game-button');
    const logoutButton = document.getElementById('logout-button');

    startGameButton.addEventListener('click', function() {
        window.location.href = 'rounds.html'; // Redirecionar para a tela de escolha de rodadas
    });

    logoutButton.addEventListener('click', function() {
        window.location.href = 'login.html'; // Redirecionar para a tela de login
    });
});
