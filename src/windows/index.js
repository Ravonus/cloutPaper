"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
console.log('TEEKA');
const react_dom_1 = require("react-dom");
const external_1 = require("./external");
// import './index.scss';
console.log('DUDE');
react_dom_1.render(jsx_runtime_1.jsx(jsx_runtime_1.Fragment, { children: jsx_runtime_1.jsx(external_1.External, {}, void 0) }, void 0), document.getElementById('windows'));
