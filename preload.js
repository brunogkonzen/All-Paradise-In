// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    addUser: (username, password) => ipcRenderer.invoke('add-user', username, password),
    getUser: (username) => ipcRenderer.invoke('get-user', username),
    startGame: () => ipcRenderer.send('start-game'),
    openMenu: () => ipcRenderer.send('open-menu')
});
