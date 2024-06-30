// register.js
document.addEventListener('DOMContentLoaded', function() {
    const createAccountButton = document.getElementById('create-account-button');
    const usernameInput = document.getElementById('new-username');
    const passwordInput = document.getElementById('new-password');

    createAccountButton.addEventListener('click', function() {
        const username = usernameInput.value;
        const password = passwordInput.value;

        if (username && password) {
            let users = JSON.parse(localStorage.getItem('users')) || [];

            // Verifica se o usu?rio j? existe
            const userExists = users.some(user => user.username === username);
            if (userExists) {
                usernameInput.value = '';
                passwordInput.value = '';
                usernameInput.disabled = false;
                passwordInput.disabled = false;
                usernameInput.focus();
                return;
            }

            // Adiciona o novo usu?rio
            users.push({ username: username, password: password });
            localStorage.setItem('users', JSON.stringify(users));

            window.location.href = 'login.html'; // Redireciona para a p?gina de login
        } else {
            usernameInput.disabled = false; // Certifique-se de que o campo est? habilitado
            passwordInput.disabled = false; // Certifique-se de que o campo est? habilitado
            usernameInput.focus(); // Focar no campo de username
        }
    });

    const backLoginButton = document.getElementById('back-login-button');
    backLoginButton.addEventListener('click', function() {
        window.location.href = 'login.html'; // Redirecionamento para a p?gina de login
    });

    // Garantir que os campos estejam sempre habilitados e foc?veis
    usernameInput.disabled = false;
    passwordInput.disabled = false;
    usernameInput.focus();
});
