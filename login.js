// login.js
document.addEventListener('DOMContentLoaded', function() {
  const loginButton = document.getElementById('login-button');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');

  loginButton.addEventListener('click', function() {
      const username = usernameInput.value;
      const password = passwordInput.value;

      let users = JSON.parse(localStorage.getItem('users')) || [];

      // Verifica se o usu?rio e senha est?o corretos
      const user = users.find(user => user.username === username && user.password === password);
      if (user) {
          alert('Login successful!');
          window.location.href = 'game-menu.html'; // Certifique-se de que este caminho est? correto
      } else {
          alert('Login failed. Incorrect username or password.');
          // Limpar os campos de entrada após uma tentativa de login falha
          usernameInput.value = '';
          passwordInput.value = '';
          usernameInput.disabled = false; // Certifique-se de que o campo est? habilitado
          passwordInput.disabled = false; // Certifique-se de que o campo est? habilitado
          usernameInput.focus(); // Focar no campo de username
      }
  });

  const registerButton = document.getElementById('register-button');
  registerButton.addEventListener('click', function() {
      window.location.href = 'register.html'; // Redirecionamento para a p?gina de registro
  });

  // Garantir que os campos estejam sempre habilitados e foc?veis
  usernameInput.disabled = false;
  passwordInput.disabled = false;
  usernameInput.focus();
});
