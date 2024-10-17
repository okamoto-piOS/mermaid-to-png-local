const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 500,
        backgroundColor: '#ffffff',
        resizable: false,  // リサイズを無効にする
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // preload.jsでIPC通信を設定
            nodeIntegration: true, // HTML側でNode.jsのモジュールを使用するために必要
            contextIsolation: false // コンテキスト分離を無効化してNode.js APIを有効化
        }
    });

    mainWindow.loadFile('index.html'); // アプリのUIとしてindex.htmlをロード
});

// アプリがすべてのウィンドウを閉じたら終了する
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});