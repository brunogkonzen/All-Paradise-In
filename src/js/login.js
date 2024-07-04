document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('login-button');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const messageBox = document.getElementById('message-box');

    loginButton.addEventListener('click', function() {
        const username = usernameInput.value;
        const password = passwordInput.value;

        let users = JSON.parse(localStorage.getItem('users')) || [];

        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            messageBox.textContent = 'Login successful!';
            messageBox.style.color = 'green';
            messageBox.style.display = 'block'; // Mostrar a mensagem
            setTimeout(() => {
                window.location.href = 'menu.html';
            }, 2000);
        } else {
            messageBox.textContent = 'Login failed. Incorrect username or password.';
            messageBox.style.color = 'red';
            messageBox.style.display = 'block'; // Mostrar a mensagem
            usernameInput.value = '';
            passwordInput.value = '';
            usernameInput.disabled = false;
            passwordInput.disabled = false;
            usernameInput.focus();
        }
    });

    const registerButton = document.getElementById('register-button');
    registerButton.addEventListener('click', function() {
        window.location.href = 'register.html';
    });

    usernameInput.disabled = false;
    passwordInput.disabled = false;
    usernameInput.focus();
});
