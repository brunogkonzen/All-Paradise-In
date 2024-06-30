// menu.js
document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.menu-button');
  const messageBox = document.getElementById('message-box');

  buttons.forEach(button => {
      button.addEventListener('click', function() {
          const rounds = this.getAttribute('data-rounds');
          localStorage.setItem('totalRounds', rounds);
          messageBox.textContent = `Starting game with best of ${rounds} rounds...`;
          messageBox.style.color = 'green';

          // Simula um atraso para exibir a mensagem antes de iniciar o jogo
          setTimeout(() => {
              // Redirecionar para a p?gina do jogo
              window.location.href = 'renderer.html'; // Certifique-se de que este caminho est? correto
          }, 2000); // Exibir mensagem por 2 segundos antes de redirecionar
      });
  });
});
