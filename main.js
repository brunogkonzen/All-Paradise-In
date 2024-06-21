const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  const loginPath = path.join(__dirname, 'login.html');
  console.log(`Loading URL: ${loginPath}`);

  win.loadURL(
    url.format({
      pathname: loginPath,
      protocol: 'file:',
      slashes: true
    })
  ).catch((error) => {
    console.error('Failed to load URL:', error);
  });

  win.webContents.on('did-finish-load', () => {
    win.webContents.send('set-title', app.getName());
  });

  win.webContents.on('new-window', (event, newUrl) => {
    event.preventDefault();
    win.loadURL(newUrl);
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
