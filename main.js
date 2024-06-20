const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'icon.png'), // Adicionar o ícone aqui
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  const indexPath = path.join(__dirname, 'index.html');
  console.log(`Loading URL: ${indexPath}`);

  win.loadURL(
    url.format({
      pathname: indexPath,
      protocol: 'file:',
      slashes: true
    })
  ).catch((error) => {
    console.error('Failed to load URL:', error);
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
