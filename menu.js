
document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.menu-button');

  buttons.forEach(button => {
    button.addEventListener('click', function() {
      const rounds = button.getAttribute('data-rounds');
      localStorage.setItem('totalRounds', rounds);
      window.location.href = 'index.html';
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.menu-button');
  buttons.forEach(button => {
      button.addEventListener('click', function() {
          const rounds = this.getAttribute('data-rounds');
          alert('Starting a game with ' + rounds + ' rounds.');
          // Adicione aqui a lógica para iniciar o jogo com o n?mero especificado de rounds
          // Por exemplo, redirecionar para uma p?gina de jogo ou iniciar uma fun??o de jogo
          // Exemplo: window.location.href = 'game.html?rounds=' + rounds;
      });
  });
});