"use strict";
/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-27 10:08:37 pm
 * @copyright TechnomancyIT
 */
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
const path_1 = __importDefault(require("path"));
const cloutTop_1 = __importDefault(require("../src/windows/cloutTop"));
let connectionId;
console.log('masd', __dirname);
const { emit, getIpc, ipcStart, ipcRegisterLibraryModel, } = require(`${__dirname}/ipc`);
// ipcStart.default({
//   models: path.join(
//     __dirname,
//     '../../',
//     'plugins',
//     'ARPaper/models/',
//     'Library.ts'
//   ),
//   type: 'addModels',
// });
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const registration = yield ipcStart({ id: connectionId });
        yield ipcRegisterLibraryModel({
            models: path_1.default.join(__dirname, '../', 'src/models/', 'Library.js'),
            type: 'addModels',
        });
        const info = yield emit('api', {
            values: {
                type: 'html5',
                path: 'http://html5.com',
                title: 'My Html5 videoz',
                description: 'This is the video',
            },
            table: 'Library',
            method: 'create',
            type: 'database',
        });
        // ipcMain.inv('setWallpaper');
        cloutTop_1.default();
        console.log('INFP', info);
    });
}
function default_1(id) {
    return __awaiter(this, void 0, void 0, function* () {
        connectionId = id;
        yield init();
    });
}
exports.default = default_1;
