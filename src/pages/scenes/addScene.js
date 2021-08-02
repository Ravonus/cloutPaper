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
const Side_1 = __importDefault(require("../../components/Side"));
const functions_1 = require("../../functions");
const { screen } = renderer_1.remote;
const AddScene = ({ darkmode }) => {
    const [options, setOptions] = react_1.useState([]);
    const [displays, setDisplays] = react_1.useState(screen.getAllDisplays());
    const [openPanel, setOpenPanel] = react_1.useState(false);
    const [docs, setDocs] = react_1.useState({});
    const [selectedDoc, setSelectedDoc] = react_1.useState();
    const [selectedOption, setSelectedOption] = react_1.useState();
    const [monitorThumb, setMonitorThumb] = react_1.useState({});
    const [selectedOptions, setSelectedOptions] = react_1.useState([]);
    const [title, setTitle] = react_1.useState('');
    const [description, setDescription] = react_1.useState('');
    react_1.useEffect(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield renderer_1.ipcRenderer.invoke('database', {
                type: 'read',
                model: 'Library',
            });
            const docs = {};
            let optionList = [];
            result.map((result) => {
                docs[result.title.replaceAll(' ', '')] = result;
                optionList.push({ value: result.id, label: result.title });
            });
            setDocs(docs);
            setOptions(optionList);
            setSelectedOption(optionList[0]);
        }))();
    }, []);
    const handleChange = (selectedOption) => __awaiter(void 0, void 0, void 0, function* () {
        const options = selectedOptions;
        let notFound = true;
        if (options.some((doc) => doc.value === selectedOption.value))
            notFound = false;
        if (notFound) {
            options.push(selectedOption);
        }
        else {
            const removeIndex = options.findIndex((item) => item.value === selectedOption.value);
            options.splice(removeIndex, 1);
        }
        setSelectedOption(selectedOption);
        yield setSelectedOptions([...options, { value: 13371337 }]);
        yield setSelectedOptions(options);
    });
    function handleThumbClick(i) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!selectedDoc)
                return;
            if (monitorThumb[selectedDoc.id] &&
                monitorThumb[selectedDoc.id].includes(i)) {
                const index = monitorThumb[selectedDoc.id].indexOf(i);
                monitorThumb[selectedDoc.id].splice(index, 1);
            }
            else if (!monitorThumb[selectedDoc.id]) {
                monitorThumb[selectedDoc.id] = [i];
            }
            else {
                monitorThumb[selectedDoc.id].push(i);
            }
            yield setMonitorThumb(monitorThumb);
            const cacheDisplays = displays;
            yield setDisplays([]);
            yield setDisplays(cacheDisplays);
        });
    }
    return (jsx_runtime_1.jsxs("div", Object.assign({ className: 'dark:text-primary container' }, { children: [jsx_runtime_1.jsx(Side_1.default, Object.assign({ title: selectedDoc === null || selectedDoc === void 0 ? void 0 : selectedDoc.title, open: openPanel, setOpen: setOpenPanel }, { children: jsx_runtime_1.jsx("div", Object.assign({ className: 'flex justify-center overflow-hidden' }, { children: displays.map(function (display, i) {
                        {
                            return selectedDoc &&
                                monitorThumb[selectedDoc.id] &&
                                monitorThumb[selectedDoc.id].includes(i) ? (jsx_runtime_1.jsxs("div", Object.assign({ id: `displayThumb-${i}`, style: {
                                    fontSize: 100,
                                    textAlign: 'center',
                                    width: 128,
                                    height: 128,
                                }, className: 'm-4 group cursor-pointer relative' }, { children: [jsx_runtime_1.jsx("webview", { style: {
                                            border: 'none',
                                            width: 128,
                                            height: 128,
                                        }, id: `webview-${selectedDoc === null || selectedDoc === void 0 ? void 0 : selectedDoc.id}`, src: selectedDoc === null || selectedDoc === void 0 ? void 0 : selectedDoc.path }, void 0), jsx_runtime_1.jsx("div", { style: { width: 128, height: 128 }, onClick: () => handleThumbClick(i), 
                                        // style={{ pointerEvents: 'none' }}
                                        className: 'absolute top-0 left-0 cursor-pointer w-32 h-32 overflow-hidden cursor-pointer border-secondary dark:border-primary border hover:border-primary dark:border dark:hover:border-secondary' }, void 0)] }), `displayThumb-${i}`)) : (jsx_runtime_1.jsx("div", Object.assign({ id: `displayThumb-${i}`, style: { fontSize: 100, textAlign: 'center' }, className: 'cursor-pointer m-4 w-32 h-32 px-4 overflow-hidden bg-gray-200 dark:bg-gray-600 border-secondary dark:border-primary border hover:border-primary dark:border dark:hover:border-secondary hover:bg-gray-300 dark:hover:bg-gray-500', onClick: () => handleThumbClick(i) }, { children: jsx_runtime_1.jsxs("span", { children: [" ", i + 1] }, void 0) }), `displayThumb-${i}`));
                        }
                    }) }), void 0) }), void 0), jsx_runtime_1.jsx("div", Object.assign({ className: 'pt-5', style: { width: 350 } }, { children: jsx_runtime_1.jsx(react_select_1.default, { value: selectedOption, onChange: handleChange, options: options }, void 0) }), void 0), jsx_runtime_1.jsx(Inputs_1.InputFloat, { label: 'Title', name: 'title', id: 'title', value: title, setValue: setTitle }, void 0), jsx_runtime_1.jsx(Inputs_1.InputFloat, { label: 'Description', name: 'Description', id: 'Description', value: description, setValue: setDescription }, void 0), jsx_runtime_1.jsx("div", Object.assign({ className: 'grid grid-cols-3 gap-2' }, { children: selectedOptions.map(function (selection, i) {
                    let title = selection.label;
                    try {
                        title = title.replaceAll(' ', '');
                    }
                    catch (e) {
                        console.log(e);
                    }
                    let foundDoc = docs[title];
                    return (jsx_runtime_1.jsxs("div", Object.assign({ className: 'bg-gray-300 dark:bg-gray-600 group relative cursor-pointer' }, { children: [jsx_runtime_1.jsx("webview", { style: {
                                    border: 'none',
                                    minWidth: 128,
                                    minHeight: 128,
                                    width: '100%',
                                    height: '100%',
                                }, id: `webview-${foundDoc === null || foundDoc === void 0 ? void 0 : foundDoc.id}`, src: foundDoc === null || foundDoc === void 0 ? void 0 : foundDoc.path }, void 0), jsx_runtime_1.jsx("div", { onClick: () => {
                                    console.log('BRING UP WINDOW FOR OPTIONS');
                                    setSelectedDoc(foundDoc);
                                    setOpenPanel(true);
                                }, 
                                // style={{ pointerEvents: 'none' }}
                                className: 'group-hover:bg-transparent bg-gray-500 bg-opacity-25 h-full w-full absolute top-0 left-0 cursor-pointer' }, void 0)] }), `webview-${foundDoc === null || foundDoc === void 0 ? void 0 : foundDoc.id}`));
                }) }), void 0), jsx_runtime_1.jsx(index_1.SecondaryButton, { text: 'Create', onClick: () => __awaiter(void 0, void 0, void 0, function* () {
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
                    yield functions_1.asyncForEach(selectedOptions, (option) => __awaiter(void 0, void 0, void 0, function* () {
                        // const windows = await ipcRenderer.invoke('windows', '');
                        // console.log('WINDOWS', windows);
                        // // const windows = await grabWindows();
                        // windows?.webContents.send(
                        //   'setWallpaper',
                        //   'http://html5wallpaper.com/wp-depo/800/'
                        // );
                        if (!info.doc) {
                        }
                        else {
                            if (!option.label)
                                return;
                            const monitors = monitorThumb[option.value];
                            const values = {
                                libraryId: option === null || option === void 0 ? void 0 : option.value,
                                sceneId: info.doc.id,
                                enabled: true,
                                monitors,
                            };
                            const libraryScene = yield renderer_1.ipcRenderer.invoke('apiMain', {
                                values,
                                table: 'LibraryScene',
                                method: 'create',
                                type: 'database',
                            });
                        }
                        // ipcRenderer.send(
                        //   'setWallpaper',
                        //   'http://html5wallpaper.com/wp-depo/800/'
                        // );
                    }));
                    console.log('WTF');
                    yield renderer_1.ipcRenderer.invoke('cloutTop');
                }) }, void 0), jsx_runtime_1.jsx(BottomBar_1.default, { buttonNames: ['home', 'library', 'scenes'], darkmode: darkmode }, void 0)] }), void 0));
};
exports.AddScene = AddScene;
exports.default = exports.AddScene;
