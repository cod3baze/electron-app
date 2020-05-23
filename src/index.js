const {
  app,
  BrowserWindow,
  globalShortcut
} = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hidden',
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile("index.html");
}

function toggleDevTools() {
  mainWindow.webContents.toggleDevTools()
}

function createShortcuts() {
  globalShortcut.register('CmdOrCtrl+j', toggleDevTools)
}

app.whenReady()
  .then(createWindow)
  .then(createShortcuts);

app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

module.exports = app