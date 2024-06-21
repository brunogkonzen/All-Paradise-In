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
  