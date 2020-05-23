const {
  app,
  BrowserWindow,
  globalShortcut,
  dialog
} = require("electron");
const setMenu = require('./main-process/menu')
const {} = require('./utils/functions')
const {
  url
} = require("./config/sites");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    titleBarStyle: "hidden",
    autoHideMenuBar: true,
    center: true,
    darkTheme: true,
    maxHeight: 1100,
    title: "Loading..",
    alwaysOnTop: true,
    backgroundColor: "#212134",
    webPreferences: {
      nodeIntegration: true,
      defaultFontSize: 14,
      nativeWindowOpen: true,
    },
  });

  mainWindow.webContents.on('crashed', () => {
    const options = {
      type: 'info',
      title: 'Renderer Process Crashed',
      message: 'This process has crashed.',
      buttons: ['Reload', 'Close']
    }

    dialog.showMessageBox(options, (index) => {
      if (index === 0) win.reload()
      else win.close()
    })
  })

  mainWindow.loadURL(url);
}

function toggleDevTools() {
  mainWindow.webContents.toggleDevTools();
}

function createShortcuts() {
  globalShortcut.register("CmdOrCtrl+j", toggleDevTools);
}

function handle_load_url(url) {
  mainWindow.loadURL(url)
}

app.whenReady().then(createWindow).then(createShortcuts);

app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

module.exports = app;
