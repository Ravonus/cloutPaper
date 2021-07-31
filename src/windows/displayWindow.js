"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-07-29 9:54:08 pm
 * @copyright TechnomancyIT
 */
function default_1() {
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
}
exports.default = default_1;
