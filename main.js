const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { addUser, getUser, getAllUsers } = require('./database');
const { getUsersByScore } = require('./database'); // This path must correctly point to your database.js file
const db = require('./database');
console.log(db); // This should show the exported functions from database.js


let mainWindow;
let gameWindow;



// Other parts of your main.js


function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, 'icon.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false
        }
    });
    mainWindow.loadFile('login.html');
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

function createGameWindow() {
    gameWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, 'icon.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false
        }
    });
    gameWindow.loadFile('renderer.html');
    gameWindow.on('closed', () => {
        gameWindow = null;
    });
}

app.whenReady().then(createMainWindow);

ipcMain.handle('add-user', async (event, username, password) => {
    try {
        const userId = await addUser(username, password);
        return { userId };
    } catch (error) {
        console.error('Error adding user:', error);
        throw new Error(`Failed to add user: ${error.message}`);
    }
});

ipcMain.handle('get-user', async (event, username) => {
    try {
        const user = await getUser(username);
        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
});


ipcMain.handle('get-users-by-score', async (event, type) => {
    try {
        const users = await getUsersByScore(type);
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error(`Failed to get users: ${error.message}`);
    }
});

ipcMain.on('open-menu', () => {
    if (mainWindow) {
        mainWindow.loadFile('menu.html');
    } else {
        createMainWindow();
        mainWindow.loadFile('menu.html');
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow();
    }
});
