const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { loadChatFile } = require('./chatLoader');

let mainWindow;

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html');

  // Allow loading of remote content (Google Fonts)
  win.webContents.session.webRequest.onBeforeRequest((details, callback) => {
    callback({cancel: false});
  });

  // Open DevTools (optional, for debugging)
  // win.webContents.openDevTools();

  mainWindow = win;
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

ipcMain.handle('open-file', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [{ name: 'JSONL', extensions: ['jsonl'] }]
  });

  if (!result.canceled) {
    const filePath = result.filePaths[0];
    const chatExamples = await loadChatFile(filePath);
    return chatExamples;
  }
});