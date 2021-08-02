"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ioHookHandle = void 0;
/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-08-01 10:14:58 pm
 * @copyright TechnomancyIT
 */
const iohook_1 = __importDefault(require("iohook"));
const keycode_1 = __importDefault(require("keycode"));
const electron_1 = require("electron");
const cloutTop_1 = require("../windows/cloutTop");
const symbols = {
    '`': '~',
    0: ')',
    1: '!',
    2: '@',
    3: '#',
    4: '$',
    5: '%',
    6: '^',
    7: '&',
    8: '*',
    9: '(',
    '-': '_',
    '=': '+',
    '[': '{',
    ']': '}',
    '\\': '|',
    ';': ':',
    "'": '"',
    ',': '<',
    '.': '>',
    '/': '?',
};
const displays = electron_1.screen.getAllDisplays();
// const displayWindows: BrowserWindowExtended[] = [];
function capitalizeFirstLetter(string) {
    if (!string)
        return;
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function grabWindowByDisplayId(display, adjustedPoint) {
    let { x, y } = adjustedPoint;
    let windows = [];
    let found = false;
    cloutTop_1.displayWindows.map((window, i) => {
        if (window.displayId === display.id) {
            windows.push(cloutTop_1.displayWindows[i]);
            if (!found) {
                for (let index = 0; index < Number(window.index); index++) {
                    const display = displays[index];
                    const { width } = display.size;
                    x = x - width;
                }
                found = true;
            }
        }
    });
    return { windows, point: { x, y } };
}
function grabDisplay() {
    const adjustedPoint = electron_1.screen.getCursorScreenPoint();
    const mousePointerDisplay = electron_1.screen.getDisplayNearestPoint(adjustedPoint);
    return { mousePointerDisplay, adjustedPoint };
}
const ioHookHandle = function (verbose) {
    iohook_1.default.removeAllListeners();
    iohook_1.default.on('mousemove', (event) => {
        const { mousePointerDisplay, adjustedPoint } = grabDisplay();
        const { windows, point } = grabWindowByDisplayId(mousePointerDisplay, adjustedPoint);
        windows.map((window) => {
            window.webContents.send('mousemove', point);
            const { x, y } = point;
            window.webContents.sendInputEvent({
                type: 'mouseMove',
                x,
                y,
            });
        });
    });
    iohook_1.default.on('mousedrag', (event) => {
        const { mousePointerDisplay, adjustedPoint } = grabDisplay();
        const { windows, point } = grabWindowByDisplayId(mousePointerDisplay, adjustedPoint);
        windows.map(function (window) {
            window.webContents.send('mousemove', point);
            const { x, y } = point;
            window.webContents.sendInputEvent({
                type: 'mouseMove',
                x,
                y,
            });
        });
    });
    iohook_1.default.on('mouseup', (event) => {
        if (event.button === 1) {
            const { mousePointerDisplay, adjustedPoint } = grabDisplay();
            const { windows, point } = grabWindowByDisplayId(mousePointerDisplay, adjustedPoint);
            windows.map((window) => {
                // const { x, y } = point;
                // window.webContents.sendInputEvent({
                //   type: 'mouseUp',
                //   x,
                //   y,
                //   button: 'left',
                //   clickCount: 1,
                // });
                window === null || window === void 0 ? void 0 : window.webContents.send('mouseup', point);
            });
        }
    });
    iohook_1.default.on('mousedown', (event) => {
        if (event.button === 1) {
            const { mousePointerDisplay, adjustedPoint } = grabDisplay();
            const { windows, point } = grabWindowByDisplayId(mousePointerDisplay, adjustedPoint);
            windows.map((window) => {
                // const { x, y } = point;
                // window.webContents.sendInputEvent({
                //   type: 'mouseDown',
                //   x,
                //   y,
                //   button: 'left',
                //   clickCount: 1,
                // });
                window === null || window === void 0 ? void 0 : window.webContents.send('mousedown', point);
            });
        }
    });
    iohook_1.default.on('keydown', (event) => {
        console.log('DOWN');
        const { mousePointerDisplay, adjustedPoint } = grabDisplay();
        const { windows } = grabWindowByDisplayId(mousePointerDisplay, adjustedPoint);
        try {
            let key = keycode_1.default(event.rawcode) && keycode_1.default(event.rawcode).length > 1
                ? capitalizeFirstLetter(keycode_1.default(event.rawcode))
                : keycode_1.default(event.rawcode);
            if (key === 'Space')
                key = ' ';
            if (event.ctrlKey) {
                key = `CommandOrControl+${capitalizeFirstLetter(key)}`;
            }
            if (event.altKey) {
                key = `Alt+${key}`;
            }
            if (event.shiftKey) {
                if (!key)
                    return;
                else if (key.match(/[^\w\*]/) || parseInt(key).toString() !== 'NaN') {
                    key = symbols[key];
                }
                else {
                    key = capitalizeFirstLetter(key);
                }
            }
            windows.map((window) => {
                window.webContents.send('keydown', key);
            });
        }
        catch (e) {
            console.log(e);
        }
    });
    iohook_1.default.on('keyup', (event) => {
        const { mousePointerDisplay, adjustedPoint } = grabDisplay();
        const { windows } = grabWindowByDisplayId(mousePointerDisplay, adjustedPoint);
        try {
            let key = keycode_1.default(event.rawcode) && keycode_1.default(event.rawcode).length > 1
                ? capitalizeFirstLetter(keycode_1.default(event.rawcode))
                : keycode_1.default(event.rawcode);
            if (key === 'Space')
                key = ' ';
            if (event.ctrlKey) {
                key = `CommandOrControl+${capitalizeFirstLetter(key)}`;
            }
            if (event.altKey) {
                key = `Alt+${key}`;
            }
            if (event.shiftKey) {
                if (!key)
                    return;
                if (parseInt(key).toString() !== 'NaN') {
                    key = keycode_1.default(event.keycode);
                }
                else {
                    key = capitalizeFirstLetter(key);
                }
            }
            windows.map((window) => {
                window === null || window === void 0 ? void 0 : window.webContents.send('keyup', key);
            });
        }
        catch (e) {
            console.log(e);
        }
    });
    iohook_1.default.start(verbose);
};
exports.ioHookHandle = ioHookHandle;
