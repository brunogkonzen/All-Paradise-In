document.addEventListener('DOMContentLoaded', function() {
    const leaderboardContainer = document.getElementById('leaderboard');
    const users = getAllUsersFromLocalStorage();

    if (users.length === 0) {
        leaderboardContainer.innerHTML = '<p>No records found.</p>';
    } else {
        users.sort((a, b) => b.bestSequence - a.bestSequence);

        users.forEach(user => {
            const userElement = document.createElement('div');
            userElement.className = 'leaderboard-entry';
            userElement.innerHTML = `
                <p><strong>${user.name}</strong></p>
                <p>Best Sequence (Best of 1): ${user.bestSequenceBestOf1 || 0}</p>
                <p>Best Sequence (Best of 3): ${user.bestSequenceBestOf3 || 0}</p>
                <p>Best Sequence (Best of 7): ${user.bestSequenceBestOf7 || 0}</p>
            `;
            leaderboardContainer.appendChild(userElement);
        });
    }

    document.getElementById('back-to-menu-button').addEventListener('click', function() {
        window.location.href = 'menu.html';
    });
});

function getAllUsersFromLocalStorage() {
    const users = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const user = JSON.parse(localStorage.getItem(key));
        if (user && user.name && user.bestSequenceBestOf1 !== undefined) {
            users.push(user);
        }
    }
    return users;
}
