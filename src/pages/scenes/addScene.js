"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddScene = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const BottomBar_1 = __importDefault(require("../../components/BottomBar"));
const react_select_1 = __importDefault(require("react-select"));
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];
const AddScene = ({ darkmode }) => {
    const [options, setOptions] = react_1.useState([
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ]);
    const [selectedOption, setSelectedOption] = react_1.useState({
        value: 'chocolate',
        label: 'Chocolate',
    });
    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        console.log(`Option selected:`, selectedOption);
    };
    return (jsx_runtime_1.jsxs("div", Object.assign({ className: 'text-center l flex flex-col justify justify-center dark:text-primary' }, { children: [jsx_runtime_1.jsx(react_select_1.default, { value: selectedOption, onChange: handleChange, options: options }, void 0), jsx_runtime_1.jsx(BottomBar_1.default, { buttonNames: ['home', 'library', 'scenes'], darkmode: darkmode }, void 0)] }), void 0));
};
exports.AddScene = AddScene;
exports.default = exports.AddScene;
