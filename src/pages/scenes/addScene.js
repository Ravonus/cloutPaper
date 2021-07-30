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
exports.AddScene = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const BottomBar_1 = __importDefault(require("../../components/BottomBar"));
const react_select_1 = __importDefault(require("react-select"));
const renderer_1 = require("electron/renderer");
const index_1 = require("../../components/buttons/index");
const Inputs_1 = require("../../components/Inputs");
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];
const AddScene = ({ darkmode }) => {
    const [options, setOptions] = react_1.useState([]);
    const [selectedOption, setSelectedOption] = react_1.useState({ value: 0, label: '' });
    const [title, setTitle] = react_1.useState('');
    const [description, setDescription] = react_1.useState('');
    react_1.useEffect(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield renderer_1.ipcRenderer.invoke('database', {
                type: 'read',
                model: 'Library',
            });
            let optionList = [];
            result.map((result) => {
                optionList.push({ value: result.id, label: result.title });
            });
            console.log('RAN', optionList);
            setOptions(optionList);
            setSelectedOption(optionList[0]);
        }))();
    }, []);
    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        console.log(`Option selected:`, selectedOption);
    };
    return (jsx_runtime_1.jsxs("div", Object.assign({ className: 'dark:text-primary container' }, { children: [jsx_runtime_1.jsx("div", Object.assign({ className: 'pt-5', style: { width: 350 } }, { children: jsx_runtime_1.jsx(react_select_1.default, { value: selectedOption, onChange: handleChange, options: options }, void 0) }), void 0), jsx_runtime_1.jsx(Inputs_1.InputFloat, { label: 'Title', name: 'title', id: 'title', value: title, setValue: setTitle }, void 0), jsx_runtime_1.jsx(Inputs_1.InputFloat, { label: 'Description', name: 'Description', id: 'Description', value: description, setValue: setDescription }, void 0), jsx_runtime_1.jsx(index_1.SecondaryButton, { text: 'Create', onClick: () => __awaiter(void 0, void 0, void 0, function* () {
                    // const windows = await ipcRenderer.invoke('windows', '');
                    // console.log('WINDOWS', windows);
                    // // const windows = await grabWindows();
                    // windows?.webContents.send(
                    //   'setWallpaper',
                    //   'http://html5wallpaper.com/wp-depo/800/'
                    // );
                    const values = {
                        title,
                        enabled: true,
                        description,
                    };
                    const info = yield renderer_1.ipcRenderer.invoke('apiMain', {
                        values,
                        table: 'Scene',
                        method: 'create',
                        type: 'database',
                    });
                    if (!info.doc) {
                    }
                    else {
                        const values = {
                            libraryId: selectedOption.value,
                            sceneId: info.doc.id,
                            enabled: true,
                            monitors: [0, 1],
                        };
                        const libraryScene = yield renderer_1.ipcRenderer.invoke('apiMain', {
                            values,
                            table: 'LibraryScene',
                            method: 'create',
                            type: 'database',
                        });
                        console.log('DONE', libraryScene);
                    }
                    // ipcRenderer.send(
                    //   'setWallpaper',
                    //   'http://html5wallpaper.com/wp-depo/800/'
                    // );
                }) }, void 0), jsx_runtime_1.jsx(BottomBar_1.default, { buttonNames: ['home', 'library', 'scenes'], darkmode: darkmode }, void 0)] }), void 0));
};
exports.AddScene = AddScene;
exports.default = exports.AddScene;
