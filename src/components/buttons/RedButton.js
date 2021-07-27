"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const RedButton = ({ text, onClick }) => {
    return (jsx_runtime_1.jsx("button", Object.assign({ onClick: onClick, className: 'text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150', type: 'button' }, { children: text }), void 0));
};
exports.RedButton = RedButton;
exports.default = exports.RedButton;
