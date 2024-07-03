const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { addUser, getUser } = require('./database');

let mainWindow;
let gameWindow;

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

app.whenReady().then(() => {
    ipcMain.handle('add-user', async (event, username, password) => {
        return new Promise((resolve, reject) => {
            addUser(username, password, (err, userId) => {
                if (err) {
                    reject({ error: err.message });
                } else {
                    resolve({ userId });
                }
            });
        });
    });

    ipcMain.handle('get-user', async (event, username) => {
        return new Promise((resolve, reject) => {
            getUser(username, (err, user) => {
                if (err) {
                    reject({ error: err.message });
                } else {
                    resolve(user);
                }
            });
        });
    });

    ipcMain.on('start-game', () => {
        if (mainWindow) {
            mainWindow.close();
        }
        createGameWindow();
    });

    ipcMain.on('open-menu', () => {
        if (mainWindow) {
            mainWindow.loadFile('menu.html');
        }
    });

    createMainWindow();
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
