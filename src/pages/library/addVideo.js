"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddVideo = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const BottomBar_1 = __importDefault(require("../../components/BottomBar"));
const AddVideo = ({ darkmode }) => {
    return (jsx_runtime_1.jsxs("div", Object.assign({ className: 'text-center l flex flex-col justify justify-center dark:text-primary' }, { children: ["Video I AM DAWG IMAGE I AM...", jsx_runtime_1.jsx(BottomBar_1.default, { buttonNames: ['home', 'library', 'scenes', 'addImage', 'addUrl'], darkmode: darkmode }, void 0)] }), void 0));
};
exports.AddVideo = AddVideo;
exports.default = exports.AddVideo;
