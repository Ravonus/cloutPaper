"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-26 10:46:56 pm
 * @copyright TechnomancyIT
 */
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const electron_wallpaper_napi_1 = __importDefault(require("electron-wallpaper-napi"));
const iohook_1 = __importDefault(require("iohook"));
const keycode_1 = __importDefault(require("keycode"));
let url = 'http://html5wallpaper.com/wp-depo/264/';
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
exports.default = () => {
    let mainWindow = new electron_1.BrowserWindow({
        webPreferences: {
            nodeIntegrationInSubFrames: true,
            webviewTag: true,
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
            webSecurity: false,
        },
        fullscreen: true,
        type: 'desktop',
        transparent: true,
        frame: false,
    });
    const cdir = path_1.default.join(__dirname, '../renderer/', 'child/');
    // setTimeout(() => {
    //   child?.loadURL(`file://${cdir}index.html`);
    // }, 20000);
    // let child = new BrowserWindow({
    //   type: 'desktop',
    //   transparent: true,
    //   frame: false,
    //   fullscreen: true,
    //   webPreferences: {
    //     nodeIntegrationInSubFrames: true,
    //     webviewTag: true,
    //     nodeIntegration: true,
    //     enableRemoteModule: true,
    //     contextIsolation: false,
    //     webSecurity: false,
    //   },
    // });
    // child.show();
    //mainWindow.setIgnoreMouseEvents(true);
    //mainWindow.webContents.openDevTools();
    electron_1.ipcMain.on('wpClick', (e, css) => { });
    const dir = path_1.default.join(__dirname, '../renderer/', 'wallpaper/');
    mainWindow.setKiosk(true);
    mainWindow.webContents.openDevTools();
    // ipcMain.handle('windows', async () => {
    //   console.log('LOGs');
    //   const result = mainWindow;
    //   console.log('WINDW', result);
    //   return result;
    // });
    electron_1.ipcMain.handle('setWallpaper', (event, newUrl) => {
        mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.loadURL(`file://${__dirname}/index.html?url=${newUrl}`);
        return true;
    });
    mainWindow.webContents.on('did-navigate', () => {
        setTimeout(() => {
            electron_wallpaper_napi_1.default.attachWindow(mainWindow);
        }, 100);
    });
    mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.loadURL(`file://${__dirname}/index.html?url=${url}`);
    iohook_1.default.on('mousemove', (event) => {
        mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.webContents.send('mousemove', electron_1.screen.getCursorScreenPoint());
    });
    iohook_1.default.on('mousedrag', (event) => {
        mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.webContents.send('mousemove', electron_1.screen.getCursorScreenPoint());
    });
    iohook_1.default.on('mouseup', (event) => {
        if (event.button === 1)
            mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.webContents.send('mouseup', electron_1.screen.getCursorScreenPoint());
    });
    iohook_1.default.on('mousedown', (event) => {
        if (event.button === 1)
            mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.webContents.send('mousedown', electron_1.screen.getCursorScreenPoint());
    });
    // globalKeys.on('keyup', (event: any) => {
    //   console.log(event);
    //   // mainWindow?.webContents.sendInputEvent({
    //   //   type: 'keyUp',
    //   //   keyCode: event.keycode,
    //   // });
    //   mainWindow?.webContents.send('keyup', event);
    // });
    iohook_1.default.on('keydown', (event) => {
        console.log(event);
        try {
            console.log(keycode_1.default(event.rawcode).length);
            let key = keycode_1.default(event.rawcode).length > 1
                ? capitalizeFirstLetter(keycode_1.default(event.rawcode))
                : keycode_1.default(event.rawcode);
            if (key === 'Space')
                key = ' ';
            mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.webContents.send('keydown', key);
        }
        catch (e) {
            console.log(e);
        }
        // mainWindow?.webContents.sendInputEvent({
        //   type: 'keyDown',
        //   keyCode: event.keycode,
        // });
    });
    //Register and start hook
    iohook_1.default.start(false);
    // setTimeout(() => {
    //   wallpaper.attachWindow(mainWindow);
    // }, 5000);
    //wallpaper.attachWindow(mainWindow);
    // mainWindow?.loadURL(`file://${dir}index.html`);
};
