document.addEventListener('DOMContentLoaded', function() {
    const registerButton = document.getElementById('register-button');
    const backButton = document.getElementById('back-button');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const messageBox = document.getElementById('message-box');

    registerButton.addEventListener('click', function() {
        const username = usernameInput.value;
        const password = passwordInput.value;

        let users = JSON.parse(localStorage.getItem('users')) || [];

        if (users.some(user => user.username === username)) {
            messageBox.textContent = 'Username already exists.';
            messageBox.style.color = 'red';
            messageBox.style.display = 'block';
            usernameInput.value = '';
            passwordInput.value = '';
            usernameInput.disabled = false;
            passwordInput.disabled = false;
            usernameInput.focus();
        } else {
            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));
            messageBox.textContent = 'Registration successful!';
            messageBox.style.color = 'green';
            messageBox.style.display = 'block';
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        }
    });

    backButton.addEventListener('click', function() {
        window.location.href = 'login.html';
    });

    usernameInput.disabled = false;
    passwordInput.disabled = false;
    usernameInput.focus();
});
