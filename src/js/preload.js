const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getUsersByScore: (type) => ipcRenderer.invoke('get-users-by-score', type)
});
