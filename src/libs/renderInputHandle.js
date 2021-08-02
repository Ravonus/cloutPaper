"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderInputHandle = void 0;
const electron_1 = require("electron");
const renderInputHandle = function (webview) {
    electron_1.ipcRenderer.on('mousedown', (event, result) => {
        let { x, y } = result;
        webview.sendInputEvent({
            type: 'mouseDown',
            x,
            y,
            button: 'left',
            clickCount: 1,
        });
    });
    electron_1.ipcRenderer.on('mouseup', (event, result) => {
        let { x, y } = result;
        console.log(x, y, webview);
        webview.sendInputEvent({
            type: 'mouseup',
            x,
            y,
            button: 'left',
            clickCount: 1,
        });
    });
    electron_1.ipcRenderer.on('keydown', (event, keyCode) => {
        console.log(keyCode, 'WTF', webview);
        webview.sendInputEvent({
            type: keyCode.length > 1 ? 'keyDown' : 'char',
            keyCode,
        });
    });
    electron_1.ipcRenderer.on('keyup', (event, keyCode) => {
        // var evt = new KeyboardEvent('keyup', { keyCode });
        // document.dispatchEvent(evt);
        if (keyCode.length > 1) {
            webview.sendInputEvent({
                type: 'keyUp',
                keyCode,
            });
        }
    });
    electron_1.ipcRenderer.on('mousemove', (event, result) => {
        const { x, y } = result;
        console.log('ERT', result);
        webview.sendInputEvent({
            type: 'mouseMove',
            x,
            y,
        });
    });
};
exports.renderInputHandle = renderInputHandle;
