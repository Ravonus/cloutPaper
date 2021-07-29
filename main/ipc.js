"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setIpcId = exports.getIpc = exports.emit = exports.setRelationships = exports.ipcRegisterModels = exports.ipcStart = void 0;
/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-30 1:27:13 am
 * @copyright TechnomancyIT
 */
const node_ipc_1 = __importDefault(require("node-ipc"));
const events_1 = __importDefault(require("events"));
const nanoid_1 = require("nanoid");
node_ipc_1.default.config.id = 'ARPaper';
node_ipc_1.default.config.retry = 1500;
node_ipc_1.default.config.maxRetries = 100;
node_ipc_1.default.config.silent = true;
const ee = new events_1.default();
function callbackGenerator(emitterId, resolve) {
    const cb = function (doc) {
        ee.removeListener(`api-${emitterId}`, cb);
        resolve(doc);
    };
    return cb;
}
const ipcStart = (opts) => {
    node_ipc_1.default.config.id = opts.id;
    return new Promise((resolve, reject) => {
        node_ipc_1.default.connectTo('Clout', function () {
            node_ipc_1.default.of.Clout.on('connect', function () {
                console.log('I CONNECT');
                node_ipc_1.default.of.Clout.emit('api', { id: opts.id, type: 'registration' });
                // ipc.of.Clout.emit('api', { models: opts.models, type: 'addModel' });
            });
            node_ipc_1.default.of.Clout.on('disconnect', function () {
                node_ipc_1.default.log('disconnected from Clout');
            });
            node_ipc_1.default.of.Clout.on('api', //any event or message type your server listens for
            function (data) {
                resolve({ data, ipc: node_ipc_1.default });
                ee.emit(`api-${data.emitterId || ''}`, data);
                // ipc.log('got a message from Clout : ', data);
            });
        });
    });
};
exports.ipcStart = ipcStart;
function ipcRegisterModels(opts) {
    return new Promise((resolve, reject) => {
        const emitterId = nanoid_1.nanoid();
        node_ipc_1.default.of.Clout.emit('api', {
            emitterId,
            models: opts.models,
            type: 'addModel',
        });
        ee.on(`api-${emitterId}`, callbackGenerator(emitterId, resolve));
    });
}
exports.ipcRegisterModels = ipcRegisterModels;
function setRelationships(relationships) {
    return new Promise((resolve, reject) => {
        const emitterId = nanoid_1.nanoid();
        node_ipc_1.default.of.Clout.emit('api', {
            emitterId,
            relationships,
            type: 'relationships',
        });
        ee.on(`api-${emitterId}`, callbackGenerator(emitterId, resolve));
    });
}
exports.setRelationships = setRelationships;
function emit(channel, values) {
    console.log('WTF', values);
    return new Promise((resolve, reject) => {
        const emitterId = nanoid_1.nanoid();
        node_ipc_1.default.of.Clout.emit(channel, Object.assign({ emitterId }, values));
        // const cb = function (doc: any) {
        //   ee.removeListener(`api-${emitterId}`, cb);
        //   resolve(doc);
        // };
        // ee.on(`api-${emitterId}`, cb);
        ee.on(`api-${emitterId}`, callbackGenerator(emitterId, resolve));
    });
}
exports.emit = emit;
function getIpc() {
    return node_ipc_1.default;
}
exports.getIpc = getIpc;
function setIpcId(id) {
    node_ipc_1.default.config.id = id;
}
exports.setIpcId = setIpcId;
