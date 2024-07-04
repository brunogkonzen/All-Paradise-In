const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { addUser, getUser, getAllUsers } = require('./database');
const { getUsersByScore } = require('./database');

let mainWindow;
let gameWindow;

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        kiosk: true,
        icon: path.join(__dirname, '../../assets/icon/icon.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false
        }
    });
    mainWindow.loadFile(path.join(__dirname, '../html/login.html'));
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    mainWindow.setMenu(null);
}

function createGameWindow() {
    gameWindow = new BrowserWindow({
        width: 800,
        height: 600,
        kiosk: true,
        icon: path.join(__dirname, '../../assets/icon/icon.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false
        }
    });
    gameWindow.loadFile(path.join(__dirname, '../html/renderer.html'));
    gameWindow.on('closed', () => {
        gameWindow = null;
        mainWindow.setMenu(null);
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
        mainWindow.loadFile(path.join(__dirname, '../html/menu.html'));
    } else {
        createMainWindow();
        mainWindow.loadFile(path.join(__dirname, '../html/menu.html'));
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
