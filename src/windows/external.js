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
const renderInputHandle_1 = require("../libs/renderInputHandle");
const { BrowserWindow, screen } = electron_1.remote;
const query = querystring_1.default.parse(global.location.search);
const displayIndex = query.displayIndex;
const bg = query.bg;
let firstRun = true;
function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
exports.wait = wait;
const External = () => {
    const [site, setSite] = react_1.useState(query['?url']);
    const displays = screen.getAllDisplays();
    function findWebview(displays) {
        return __awaiter(this, void 0, void 0, function* () {
            let webview = document.getElementById('foo');
            if (!webview) {
                console.log('NO FOUND');
                yield wait(1000);
                webview = yield findWebview(displays);
                return webview;
            }
            webview.addEventListener('did-stop-loading', function () {
                if (!firstRun)
                    return;
                firstRun = false;
                electron_1.ipcRenderer.removeAllListeners('mouseup');
                electron_1.ipcRenderer.removeAllListeners('mousedown');
                electron_1.ipcRenderer.removeAllListeners('keydown');
                webview.insertCSS(`html,body{ overflow:hidden; ${bg}}, ::-webkit - scrollbar{display: none;}`);
                setTimeout(() => {
                    // webview.sendInputEvent({ type: 'mouseDown', x: 1263, y: 730, button: 'left', clickCount: 100 });
                    // webview.sendInputEvent({ type: 'mouseUp', x: 1263, y: 730, button: 'left', clickCount: 1 });
                    var b = document.body;
                    b.addEventListener('click', function (event) {
                        console.log('TERDS');
                        console.log(event.pageX, event.pageY);
                    }, false);
                    //   webview.sendInputEvent({ type: 'mouseUp', x: 1263, y: 730, button: 'left', globalX: 1263, globalY: 730 });
                    webview.insertBefore;
                }, 5000);
                //webview.openDevTools();
                renderInputHandle_1.renderInputHandle(webview);
            });
            // webview.style.width = '1'
            webview.style.width = `${displays[displayIndex].size.width}px`;
            webview.style.height = `${displays[displayIndex].size.height}px`;
            return webview;
        });
    }
    electron_1.ipcRenderer.on('setWallpaper', (event, result) => {
        console.log(result);
        setSite(result);
        electron_1.remote.getCurrentWindow().reload();
    });
    react_1.useEffect(() => {
        findWebview(displays);
    }, []);
    return jsx_runtime_1.jsx("webview", { id: 'foo', src: site }, void 0);
};
exports.External = External;
exports.default = exports.External;
