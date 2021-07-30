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
exports.Library = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const electron_1 = require("electron");
const react_1 = require("react");
const BottomBar_1 = __importDefault(require("../../components/BottomBar"));
const Library = ({ darkmode }) => {
    const [items, setItems] = react_1.useState([]);
    react_1.useEffect(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield electron_1.ipcRenderer.invoke('database', {
                type: 'read',
                model: 'Library',
            });
            setItems(result);
        }))();
    }, []);
    return (jsx_runtime_1.jsxs("div", Object.assign({ className: 'text-center l flex flex-col justify justify-center dark:text-primary' }, { children: [jsx_runtime_1.jsx("div", Object.assign({ className: 'container grid grid-cols-3 gap-4' }, { children: items.map((opt, i) => {
                    return (jsx_runtime_1.jsx("div", { children: jsx_runtime_1.jsx("div", { children: opt.title }, void 0) }, `plugin-${opt.title}-${i}`));
                }) }), void 0), jsx_runtime_1.jsx(BottomBar_1.default, { buttonNames: ['home', 'scenes', 'addImage', 'addUrl', 'addVideo'], darkmode: darkmode }, void 0)] }), void 0));
};
exports.Library = Library;
exports.default = exports.Library;
