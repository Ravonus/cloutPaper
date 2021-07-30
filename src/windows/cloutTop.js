"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const electron_wallpaper_napi_1 = __importDefault(require("electron-wallpaper-napi"));
const iohook_1 = __importDefault(require("iohook"));
const keycode_1 = __importDefault(require("keycode"));
const LibraryScene_1 = __importDefault(require("../models/LibraryScene"));
const Scene_1 = __importDefault(require("../models/Scene"));
const functions_1 = require("../functions");
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
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    const scenes = yield Scene_1.default.findAll({ where: { enabled: true } });
    const scene = scenes[scenes.length - 1];
    const libraryScenes = yield LibraryScene_1.default.findAll({
        where: { sceneId: scene === null || scene === void 0 ? void 0 : scene.id },
    });
    yield functions_1.asyncForEach(libraryScenes, (scene) => __awaiter(void 0, void 0, void 0, function* () {
        const library = yield scene.$get('library');
        const displayIndex = typeof (scene === null || scene === void 0 ? void 0 : scene.monitors) === 'string' ? scene.monitors.split(',') : '';
        if (!displayIndex)
            return;
        displayIndex.map((i) => {
            const display = displays[Number(i)];
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
            let url = library === null || library === void 0 ? void 0 : library.path;
            window === null || window === void 0 ? void 0 : window.loadURL(`file://${__dirname}/index.html?url=${url}&displayIndex=${i}&bg=background-color: rgba(255, 255, 255, 0) !important; background: rgba(255, 255, 255, 0) !important;`);
            window.displayId = display.id;
            displayWindows.push(window);
        });
        electron_1.ipcMain.handle('setWallpaper', (event, { url, display, bg }) => {
            var _a;
            (_a = displayWindows[display]) === null || _a === void 0 ? void 0 : _a.loadURL(`file://${__dirname}/index.html?url=${url}&displayIndex=${display}&bg=${bg}`);
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
                window === null || window === void 0 ? void 0 : window.webContents.send('mousedown', point);
            }
        });
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
    }));
    // displays.map((display, i) => {
    //   let window: null | BrowserWindowExtended = new BrowserWindow({
    //     webPreferences: {
    //       nodeIntegrationInSubFrames: true,
    //       webviewTag: true,
    //       nodeIntegration: true,
    //       enableRemoteModule: true,
    //       contextIsolation: false,
    //       webSecurity: false,
    //     },
    //     fullscreen: true,
    //     type: 'desktop',
    //     transparent: true,
    //     frame: false,
    //   });
    //   window.setBounds(display.bounds);
    //   window.setKiosk(true);
    //   //window.webContents.openDevTools();
    //   window.webContents.on('did-navigate', () => {
    //     setTimeout(() => {
    //       wallpaper.attachWindow(window);
    //     }, 100);
    //   });
    //   let url = 'http://html5wallpaper.com/wp-depo/264/';
    //   window?.loadURL(
    //     `file://${__dirname}/index.html?url=${url}&displayIndex=${i}&bg=background-color: rgba(255, 255, 255, 0) !important; background: rgba(255, 255, 255, 0) !important;`
    //   );
    //   window.displayId = display.id;
    //   displayWindows.push(window);
    // });
    // ipcMain.handle('setWallpaper', (event, { url, display, bg }) => {
    //   displayWindows[display]?.loadURL(
    //     `file://${__dirname}/index.html?url=${url}&displayIndex=${display}&bg=${bg}`
    //   );
    //   return true;
    // });
    // globalKeys.on('mousemove', (event: any) => {
    //   const { mousePointerDisplay, adjustedPoint } = grabDisplay();
    //   const { window, point } = grabWindowByDisplayId(
    //     mousePointerDisplay,
    //     adjustedPoint
    //   );
    //   window?.webContents.send('mousemove', point);
    // });
    // globalKeys.on('mousedrag', (event: any) => {
    //   const { mousePointerDisplay, adjustedPoint } = grabDisplay();
    //   const { window, point } = grabWindowByDisplayId(
    //     mousePointerDisplay,
    //     adjustedPoint
    //   );
    //   window?.webContents.send('mousemove', point);
    // });
    // globalKeys.on('mouseup', (event: any) => {
    //   if (event.button === 1) {
    //     const { mousePointerDisplay, adjustedPoint } = grabDisplay();
    //     const { window, point } = grabWindowByDisplayId(
    //       mousePointerDisplay,
    //       adjustedPoint
    //     );
    //     window?.webContents.send('mouseup', point);
    //   }
    // });
    // globalKeys.on('mousedown', (event: any) => {
    //   if (event.button === 1) {
    //     const { mousePointerDisplay, adjustedPoint } = grabDisplay();
    //     const { window, point } = grabWindowByDisplayId(
    //       mousePointerDisplay,
    //       adjustedPoint
    //     );
    //     window?.webContents.send('mousedown', point);
    //   }
    // });
    // globalKeys.on('keydown', (event: any) => {
    //   const { mousePointerDisplay, adjustedPoint } = grabDisplay();
    //   const { window } = grabWindowByDisplayId(
    //     mousePointerDisplay,
    //     adjustedPoint
    //   );
    //   try {
    //     let key =
    //       keycode(event.rawcode).length > 1
    //         ? capitalizeFirstLetter(keycode(event.rawcode))
    //         : keycode(event.rawcode);
    //     if (key === 'Space') key = ' ';
    //     window?.webContents.send('keydown', key);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // });
    // //Register and start hook
    // globalKeys.start(false);
});
