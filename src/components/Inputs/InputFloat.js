"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputFloat = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const InputFloat = ({ id, name, label, value, setValue, }) => {
    const [localValue, setLocalValue] = react_1.useState(value || '');
    function handleChange(event) {
        const value = event === null || event === void 0 ? void 0 : event.target.value;
        setValue(value);
        setLocalValue(value);
    }
    return (jsx_runtime_1.jsx(jsx_runtime_1.Fragment, { children: jsx_runtime_1.jsxs("div", Object.assign({ className: `relative h-10 input-component focus:outline-none mb-5 ${localValue === '' || !localValue ? 'empty' : ''}` }, { children: [jsx_runtime_1.jsx("input", { onChange: handleChange, id: id || '', type: 'text', name: name || '', className: 'outline-none h-full w-full px-2 transition-all border-secondary dark:border-primary rounded-sm bg-transparent dark:text-primary text-black focus:ring-0 group', value: localValue }, void 0), jsx_runtime_1.jsx("label", Object.assign({ htmlFor: name || '', className: 'absolute left-2 transition-all px-1 bg-transparent dark:text-white group-focus:text-primary text-secondary' }, { children: label }), void 0)] }), void 0) }, void 0));
};
exports.InputFloat = InputFloat;
exports.default = exports.InputFloat;
