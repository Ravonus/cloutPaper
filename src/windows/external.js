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
exports.External = exports.wait = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
//TODO: Add Settings to active side nav check.
const react_1 = require("react");
const electron_1 = require("electron");
const querystring_1 = __importDefault(require("querystring"));
const { BrowserWindow, screen } = electron_1.remote;
const query = querystring_1.default.parse(global.location.search);
const displayIndex = query.displayIndex;
function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
exports.wait = wait;
function findWebview(displays) {
    return __awaiter(this, void 0, void 0, function* () {
        const webview = document.getElementById('foo');
        if (!webview) {
            yield wait(100);
            findWebview(displays);
        }
        webview.addEventListener('did-stop-loading', loadstop);
        function loadstop() {
            webview.insertCSS('html,body{ overflow:hidden; background-color: rgba(255, 255, 255, 0) !important; background: rgba(255, 255, 255, 0) !important;}, ::-webkit - scrollbar{display: none;}');
            setTimeout(() => {
                // webview.sendInputEvent({ type: 'mouseDown', x: 1263, y: 730, button: 'left', clickCount: 100 });
                // webview.sendInputEvent({ type: 'mouseUp', x: 1263, y: 730, button: 'left', clickCount: 1 });
                var b = document.body;
                b.addEventListener('click', function (event) {
                    console.log(event.pageX, event.pageY);
                }, false);
                //   webview.sendInputEvent({ type: 'mouseUp', x: 1263, y: 730, button: 'left', globalX: 1263, globalY: 730 });
                webview.insertBefore;
            }, 5000);
        }
        // webview.openDevTools();
        electron_1.ipcRenderer.on('mouseup', (event, result) => {
            let { x, y } = result;
            x = x - 2560;
            console.log('MOUSE Up', result);
            webview.sendInputEvent({
                type: 'mouseup',
                x,
                y,
                button: 'left',
                clickCount: 1,
            });
        });
        electron_1.ipcRenderer.on('mousedown', (event, result) => {
            let { x, y } = result;
            console.log('MOUSE DOWN', result);
            webview.sendInputEvent({
                type: 'mousedown',
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
        // webview.style.width = '1'
        webview.style.width = `${displays[displayIndex].size.width}px`;
        webview.style.height = `${displays[displayIndex].size.height}px`;
    });
}
const External = () => {
    const [site, setSite] = react_1.useState(query['?url']);
    const displays = screen.getAllDisplays();
    // ipcRenderer.on('setWallpaper', (event, result) => {
    //   console.log(result);
    //   setSite(result);
    //   remote.getCurrentWindow().reload();
    // });
    react_1.useEffect(() => {
        findWebview(displays);
    });
    return jsx_runtime_1.jsx("webview", { id: 'foo', src: site }, void 0);
};
exports.External = External;
exports.default = exports.External;
