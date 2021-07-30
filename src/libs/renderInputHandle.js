"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderInputHandle = void 0;
const electron_1 = require("electron");
const renderInputHandle = function (webview) {
    electron_1.ipcRenderer.on('mousedown', (event, result) => {
        let { x, y } = result;
        webview.sendInputEvent({
            type: 'mousedown',
            x,
            y,
            button: 'left',
            clickCount: 1,
        });
    });
    electron_1.ipcRenderer.on('mouseup', (event, result) => {
        let { x, y } = result;
        webview.sendInputEvent({
            type: 'mouseup',
            x,
            y,
            button: 'left',
            clickCount: 1,
        });
    });
    electron_1.ipcRenderer.on('keydown', (event, keyCode) => {
        webview.sendInputEvent({
            type: keyCode.length > 1 ? 'keyUp' : 'char',
            keyCode,
        });
    });
    electron_1.ipcRenderer.on('keyup', (event, keyInfo) => {
        const keyCode = keyInfo.rawcode.toString();
        // var evt = new KeyboardEvent('keyup', { keyCode });
        // document.dispatchEvent(evt);
        webview.sendInputEvent({
            type: 'char',
            keyCode,
        });
    });
    electron_1.ipcRenderer.on('mousemove', (event, result) => {
        const { x, y } = result;
        webview.sendInputEvent({
            type: 'mousemove',
            x,
            y,
        });
    });
};
exports.renderInputHandle = renderInputHandle;
