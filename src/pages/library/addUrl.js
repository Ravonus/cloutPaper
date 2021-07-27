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
exports.AddUrl = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const renderer_1 = require("electron/renderer");
const react_1 = require("react");
const BottomBar_1 = __importDefault(require("../../components/BottomBar"));
const index_1 = require("../../components/buttons/index");
const Inputs_1 = require("../../components/Inputs");
const { screen, getCurrentWindow } = renderer_1.remote;
const displays = screen.getAllDisplays();
const AddUrl = ({ darkmode }) => {
    const [url, setUrl] = react_1.useState('');
    react_1.useEffect(() => {
        console.log('URL CHANGED', url);
    }, [url]);
    return (jsx_runtime_1.jsxs("div", Object.assign({ className: 'dark:text-primary container' }, { children: [jsx_runtime_1.jsxs("div", { children: [jsx_runtime_1.jsx("div", Object.assign({ style: { width: 500 }, className: 'inline-block' }, { children: jsx_runtime_1.jsx(Inputs_1.InputFloat, { label: 'URL', name: 'url', id: 'url', value: url, setValue: setUrl }, void 0) }), void 0), jsx_runtime_1.jsxs("button", Object.assign({ className: 'bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center inline-block' }, { children: [jsx_runtime_1.jsx("svg", Object.assign({ className: 'w-4 h-4 mr-2', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 20 20' }, { children: jsx_runtime_1.jsx("path", { d: 'M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z' }, void 0) }), void 0), jsx_runtime_1.jsx("span", { children: "Create" }, void 0)] }), void 0)] }, void 0), displays.map((display, i) => {
                return (jsx_runtime_1.jsx(index_1.SecondaryButton, { text: `Preview Display-${i}`, onClick: () => __awaiter(void 0, void 0, void 0, function* () {
                        // const windows = await ipcRenderer.invoke('windows', '');
                        // console.log('WINDOWS', windows);
                        // // const windows = await grabWindows();
                        // windows?.webContents.send(
                        //   'setWallpaper',
                        //   'http://html5wallpaper.com/wp-depo/800/'
                        // );
                        const value = document.getElementById('url')
                            .value;
                        console.log('VALUE');
                        renderer_1.ipcRenderer.invoke('setWallpaper', value);
                        // ipcRenderer.send(
                        //   'setWallpaper',
                        //   'http://html5wallpaper.com/wp-depo/800/'
                        // );
                    }) }, void 0));
            }), jsx_runtime_1.jsx(BottomBar_1.default, { buttonNames: ['home', 'library', 'scenes', 'addImage', 'addVideo'], darkmode: darkmode }, void 0)] }), void 0));
};
exports.AddUrl = AddUrl;
exports.default = exports.AddUrl;
