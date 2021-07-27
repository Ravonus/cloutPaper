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
const displays = electron_1.screen.getAllDisplays();
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function grabWindowByDisplayId(display, adjustedPoint) {
    let index = 0;
    let { x, y } = adjustedPoint;
    let found = false;
    displayWindows.map((window, i) => {
        if (window.displayId === display.id) {
            index = i;
            found = true;
        }
        else if (!found) {
            const size = window.getSize();
            x = x - size[0];
        }
    });
    return { window: displayWindows[index], point: { x, y } };
}
function grabDisplay() {
    const adjustedPoint = electron_1.screen.getCursorScreenPoint();
    const mousePointerDisplay = electron_1.screen.getDisplayNearestPoint(adjustedPoint);
    return { mousePointerDisplay, adjustedPoint };
}
const displayWindows = [];
exports.default = () => {
    displays.map((display, i) => {
        let window = new electron_1.BrowserWindow({
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
        window.setBounds(display.bounds);
        window.setKiosk(true);
        //window.webContents.openDevTools();
        window.webContents.on('did-navigate', () => {
            setTimeout(() => {
                electron_wallpaper_napi_1.default.attachWindow(window);
            }, 100);
        });
        let url = 'http://html5wallpaper.com/wp-depo/264/';
        window === null || window === void 0 ? void 0 : window.loadURL(`file://${__dirname}/index.html?url=${url}&displayIndex=${i}`);
        window.displayId = display.id;
        displayWindows.push(window);
    });
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
    //mainWindow.webContents.openDevTools();
    const dir = path_1.default.join(__dirname, '../renderer/', 'wallpaper/');
    let url = 'http://html5wallpaper.com/wp-depo/264/';
    mainWindow.hide();
    mainWindow.webContents.on('did-navigate', () => {
        setTimeout(() => {
            electron_wallpaper_napi_1.default.attachWindow(mainWindow);
        }, 100);
    });
    electron_1.ipcMain.handle('setWallpaper', (event, { url, display }) => {
        var _a;
        (_a = displayWindows[display]) === null || _a === void 0 ? void 0 : _a.loadURL(`file://${__dirname}/index.html?url=${url}&displayIndex=${display}`);
        return true;
    });
    iohook_1.default.on('mousemove', (event) => {
        const { mousePointerDisplay, adjustedPoint } = grabDisplay();
        const { window, point } = grabWindowByDisplayId(mousePointerDisplay, adjustedPoint);
        window === null || window === void 0 ? void 0 : window.webContents.send('mousemove', point);
    });
    iohook_1.default.on('mousedrag', (event) => {
        const { mousePointerDisplay, adjustedPoint } = grabDisplay();
        const { window, point } = grabWindowByDisplayId(mousePointerDisplay, adjustedPoint);
        window === null || window === void 0 ? void 0 : window.webContents.send('mousemove', point);
    });
    iohook_1.default.on('mouseup', (event) => {
        if (event.button === 1) {
            const { mousePointerDisplay, adjustedPoint } = grabDisplay();
            const { window, point } = grabWindowByDisplayId(mousePointerDisplay, adjustedPoint);
            window === null || window === void 0 ? void 0 : window.webContents.send('mouseup', point);
        }
    });
    iohook_1.default.on('mousedown', (event) => {
        if (event.button === 1) {
            const { mousePointerDisplay, adjustedPoint } = grabDisplay();
            const { window, point } = grabWindowByDisplayId(mousePointerDisplay, adjustedPoint);
            window.getPosition;
            window === null || window === void 0 ? void 0 : window.webContents.send('mousedown', point);
        }
    });
    // globalKeys.on('keyup', (event: any) => {
    //   // mainWindow?.webContents.sendInputEvent({
    //   //   type: 'keyUp',
    //   //   keyCode: event.keycode,
    //   // });
    //   mainWindow?.webContents.send('keyup', event);
    // });
    iohook_1.default.on('keydown', (event) => {
        const { mousePointerDisplay, adjustedPoint } = grabDisplay();
        const { window } = grabWindowByDisplayId(mousePointerDisplay, adjustedPoint);
        try {
            let key = keycode_1.default(event.rawcode).length > 1
                ? capitalizeFirstLetter(keycode_1.default(event.rawcode))
                : keycode_1.default(event.rawcode);
            if (key === 'Space')
                key = ' ';
            window === null || window === void 0 ? void 0 : window.webContents.send('keydown', key);
        }
        catch (e) {
            console.log(e);
        }
    });
    //Register and start hook
    iohook_1.default.start(false);
    // setTimeout(() => {
    //   wallpaper.attachWindow(mainWindow);
    // }, 5000);
    //wallpaper.attachWindow(mainWindow);
    // mainWindow?.loadURL(`file://${dir}index.html`);
};
