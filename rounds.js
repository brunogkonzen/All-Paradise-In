// rounds.js
document.addEventListener('DOMContentLoaded', function() {
    const roundButtons = document.querySelectorAll('.round-button');
    const messageBox = document.getElementById('message-box');
    const backToMenuButton = document.getElementById('back-to-menu-button');

    roundButtons.forEach(button => {
        button.addEventListener('click', function() {
            const rounds = this.getAttribute('data-rounds');
            localStorage.setItem('totalRounds', rounds);
            messageBox.textContent = `Starting game with best of ${rounds} rounds...`;
            messageBox.style.color = 'green';
            messageBox.style.display = 'block';

            setTimeout(() => {
                window.location.href = 'renderer.html'; // Carregar a tela de jogo
            }, 2000);
        });
    });

    backToMenuButton.addEventListener('click', function() {
        window.location.href = 'menu.html'; // Redirecionar para o menu
    });
});
