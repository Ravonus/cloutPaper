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
exports.Internal = exports.wait = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
//TODO: Add Settings to active side nav check.
const react_1 = require("react");
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const querystring_1 = __importDefault(require("querystring"));
electron_1.remote.getCurrentWindow();
const { BrowserWindow, screen } = electron_1.remote;
const query = querystring_1.default.parse(global.location.search);
const displayIndex = query.displayIndex;
const bg = query.bg;
function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
exports.wait = wait;
function findWebview(displays) {
    return __awaiter(this, void 0, void 0, function* () {
        const webview = document.getElementById('htmlLoaded');
        console.log('RUNK');
        if (!webview) {
            yield wait(100);
            yield findWebview(displays);
        }
        //webview.openDevTools();
        webview.addEventListener('did-stop-loading', () => {
            console.log('FINISHEd');
            webview.openDevTools();
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
        });
        // webview.style.width = '1'
        webview.style.width = `${displays[displayIndex].size.width}px`;
        webview.style.height = `${displays[displayIndex].size.height}px`;
    });
}
const Internal = () => {
    const displays = screen.getAllDisplays();
    // eval(scriptString);
    react_1.useEffect(() => {
        findWebview(displays);
    });
    const htmlPath = `file://${path_1.default.join(__dirname, '../../', 'public/sakura/', 'index.html')}`;
    console.log('HTMLPATH', htmlPath);
    return (jsx_runtime_1.jsx(jsx_runtime_1.Fragment, { children: jsx_runtime_1.jsx("webview", { id: 'htmlLoaded', src: htmlPath }, void 0) }, void 0));
};
exports.Internal = Internal;
exports.default = exports.Internal;
