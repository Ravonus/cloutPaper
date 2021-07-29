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
const mb_react_color_picker_1 = __importDefault(require("mb-react-color-picker"));
const { screen, getCurrentWindow } = renderer_1.remote;
const displays = screen.getAllDisplays();
const AddUrl = ({ darkmode }) => {
    const [url, setUrl] = react_1.useState('');
    const [title, setTitle] = react_1.useState('');
    const [description, setDescription] = react_1.useState('');
    const [color, setColor] = react_1.useState('rgba(0, 0, 0, 1)');
    react_1.useEffect(() => {
        console.log('URL CHANGED', url);
    }, [url]);
    function createLibraryItem() {
        return __awaiter(this, void 0, void 0, function* () {
            const info = yield renderer_1.ipcRenderer.invoke('apiMain', {
                values: {
                    type: 'html5',
                    path: url,
                    title,
                    description,
                    extra: { bg: color },
                },
                table: 'Library',
                method: 'create',
                type: 'database',
            });
            // const info = await emit('api', {
            //   values: {
            //     type: 'html5',
            //     path: url,
            //     title,
            //     description,
            //     extra: { bg: color },
            //   },
            //   table: 'Library',
            //   method: 'create',
            //   type: 'database',
            // });
        });
    }
    return (jsx_runtime_1.jsxs("div", Object.assign({ className: 'dark:text-primary container pb-12' }, { children: [jsx_runtime_1.jsxs("div", { children: [jsx_runtime_1.jsx("div", { style: { width: 500 }, className: 'inline-block' }, void 0), jsx_runtime_1.jsx(Inputs_1.InputFloat, { label: 'Website', name: 'website', id: 'website', value: url, setValue: setUrl }, void 0), jsx_runtime_1.jsx(Inputs_1.InputFloat, { label: 'Title', name: 'title', id: 'title', value: title, setValue: setTitle }, void 0), jsx_runtime_1.jsx(Inputs_1.InputFloat, { type: 'textarea', label: 'Description', name: 'description', id: 'description', value: description, setValue: setDescription }, void 0), jsx_runtime_1.jsx(mb_react_color_picker_1.default, { headerText: 'CSS Background', color: color, onChange: (color) => {
                            setColor(color.target ? color.target.value : color);
                        }, onConfirm: (color) => {
                            setColor(color);
                        }, style: { position: 'unset' } }, void 0)] }, void 0), displays.map((display, i) => {
                return (jsx_runtime_1.jsx(index_1.SecondaryButton, { text: `Preview Display-${i}`, onClick: () => __awaiter(void 0, void 0, void 0, function* () {
                        // const windows = await ipcRenderer.invoke('windows', '');
                        // console.log('WINDOWS', windows);
                        // // const windows = await grabWindows();
                        // windows?.webContents.send(
                        //   'setWallpaper',
                        //   'http://html5wallpaper.com/wp-depo/800/'
                        // );
                        const value = document.getElementById('website').value;
                        renderer_1.ipcRenderer.invoke('setWallpaper', {
                            url,
                            display: i,
                            bg: `background-color: ${color} !important; background: ${color} !important;`,
                        });
                        // ipcRenderer.send(
                        //   'setWallpaper',
                        //   'http://html5wallpaper.com/wp-depo/800/'
                        // );
                    }) }, void 0));
            }), jsx_runtime_1.jsxs("button", Object.assign({ onClick: createLibraryItem, className: 'bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center inline-block' }, { children: [jsx_runtime_1.jsx("svg", Object.assign({ className: 'w-4 h-4 mr-2', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 20 20' }, { children: jsx_runtime_1.jsx("path", { d: 'M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z' }, void 0) }), void 0), jsx_runtime_1.jsx("span", { children: "Create" }, void 0)] }), void 0), jsx_runtime_1.jsx("div", { className: 'mb-6' }, void 0), jsx_runtime_1.jsx(BottomBar_1.default, { buttonNames: ['home', 'library', 'scenes', 'addImage', 'addVideo'], darkmode: darkmode }, void 0)] }), void 0));
};
exports.AddUrl = AddUrl;
exports.default = exports.AddUrl;
