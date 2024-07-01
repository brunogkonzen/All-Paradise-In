// register.js
document.addEventListener('DOMContentLoaded', function() {
    const registerButton = document.getElementById('register-button');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const messageBox = document.getElementById('message-box');
    const backButton = document.getElementById('back-button');

    registerButton.addEventListener('click', function() {
        const username = usernameInput.value;
        const password = passwordInput.value;

        let users = JSON.parse(localStorage.getItem('users')) || [];

        if (username === '') {
            messageBox.textContent = 'Username is required.';
            messageBox.style.color = 'red';
            messageBox.style.display = 'block'; // Mostrar a mensagem
        } else if (password === '') {
            messageBox.textContent = 'Password is required.';
            messageBox.style.color = 'red';
            messageBox.style.display = 'block'; // Mostrar a mensagem
        } else if (users.find(user => user.username === username)) {
            messageBox.textContent = 'Username already taken.';
            messageBox.style.color = 'red';
            messageBox.style.display = 'block'; // Mostrar a mensagem
        } else {
            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));
            messageBox.textContent = 'Registration successful!';
            messageBox.style.color = 'green';
            messageBox.style.display = 'block'; // Mostrar a mensagem
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        }
    });

    backButton.addEventListener('click', function() {
        window.location.href = 'login.html';
    });
});
