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
exports.displayWindows = void 0;
/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-26 10:46:56 pm
 * @copyright TechnomancyIT
 */
const electron_1 = require("electron");
const electron_wallpaper_napi_1 = __importDefault(require("electron-wallpaper-napi"));
const LibraryScene_1 = __importDefault(require("../models/LibraryScene"));
const Scene_1 = __importDefault(require("../models/Scene"));
const functions_1 = require("../functions");
const IoHookHandle_1 = require("../libs/IoHookHandle");
const displays = electron_1.screen.getAllDisplays();
exports.displayWindows = [];
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    exports.displayWindows.map(function (window, i) {
        window.close();
        delete exports.displayWindows[i];
    });
    const scenes = yield Scene_1.default.findAll({ where: { enabled: true } });
    const scene = scenes[scenes.length - 1];
    const libraryScenes = yield LibraryScene_1.default.findAll({
        where: { sceneId: scene === null || scene === void 0 ? void 0 : scene.id },
    });
    yield functions_1.asyncForEach(libraryScenes, (scene) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const library = yield scene.$get('library');
        console.log('S', scene.monitors);
        if (!((_a = scene.monitors) === null || _a === void 0 ? void 0 : _a.toString()))
            return;
        let displayIndex = typeof (scene === null || scene === void 0 ? void 0 : scene.monitors) === 'string'
            ? scene.monitors.split(',')
            : [scene.monitors.toString()];
        if (!displayIndex || typeof displayIndex === 'string')
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
            //  window.webContents.openDevTools();
            window.webContents.on('did-navigate', () => {
                setTimeout(() => {
                    electron_wallpaper_napi_1.default.attachWindow(window);
                }, 100);
            });
            let url = library === null || library === void 0 ? void 0 : library.path;
            //  console.log(url, displayIndex);
            window === null || window === void 0 ? void 0 : window.loadURL(`file://${__dirname}/index.html?url=${url}&displayIndex=${i}&bg=background-color: rgba(255, 255, 255, 0) !important; background: rgba(255, 255, 255, 0) !important;`);
            window.displayId = display.id;
            window.index = i;
            exports.displayWindows.push(window);
        });
    }));
    IoHookHandle_1.ioHookHandle();
});
electron_1.ipcMain.handle('setWallpaper', (event, { url, display, bg }) => {
    var _a;
    (_a = exports.displayWindows[display]) === null || _a === void 0 ? void 0 : _a.loadURL(`file://${__dirname}/index.html?url=${url}&displayIndex=${display}&bg=${bg}`);
    return true;
});
