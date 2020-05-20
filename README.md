# electron-app

|Módulo|descriçao|
|||
|||
|||

---

- Criando um app básico

```js
  // Cria a janela do navegador.
  const createWindow = () => const mainWindow = new BrowserWindow({
    width: 800, // largura inicial
    height: 600, // altura inicial
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Este método será chamado quando o Electron terminar a inicialização e estiver pronto para criar janelas do navegador.
  app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
        // No macOS, é comum recriar uma janela no aplicativo quando o ícone do encaixe é clicado e não há outras janelas abertas.
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  })

  // Sai quando todas janelas extiverem fechadas
  app.on("window-all-closed", function () {
    // No macOS, é comum que os aplicativos e sua barra de menus permaneçam 
    // ativos até que o usuário saia explicitamente com Cmd + Q
    if (process.platform !== "darwin") app.quit();
  });
;
```
