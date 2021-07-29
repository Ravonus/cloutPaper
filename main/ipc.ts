/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-30 1:27:13 am
 * @copyright TechnomancyIT
 */
import ipc from 'node-ipc';
import EventEmitter from 'events';
import { nanoid } from 'nanoid';

ipc.config.id = 'ARPaper';
ipc.config.retry = 1500;
ipc.config.maxRetries = 100;
ipc.config.silent = true;

const ee = new EventEmitter();

function callbackGenerator(emitterId: string, resolve: any) {
  const cb = function (doc: any) {
    ee.removeListener(`api-${emitterId}`, cb);

    resolve(doc);
  };

  return cb;
}

export const ipcStart = (opts: any) => {
  ipc.config.id = opts.id;

  return new Promise((resolve, reject) => {
    ipc.connectTo('Clout', function () {
      ipc.of.Clout.on('connect', function () {
        console.log('I CONNECT');
        ipc.of.Clout.emit('api', { id: opts.id, type: 'registration' });
        // ipc.of.Clout.emit('api', { models: opts.models, type: 'addModel' });
      });
      ipc.of.Clout.on('disconnect', function () {
        ipc.log('disconnected from Clout');
      });
      ipc.of.Clout.on(
        'api', //any event or message type your server listens for
        function (data: any) {
          resolve({ data, ipc });

          ee.emit(`api-${data.emitterId || ''}`, data);
          // ipc.log('got a message from Clout : ', data);
        }
      );
    });
  });
};

export function ipcRegisterModels(opts: any) {
  return new Promise((resolve, reject) => {
    const emitterId = nanoid();
    ipc.of.Clout.emit('api', {
      emitterId,
      models: opts.models,
      type: 'addModel',
    });

    ee.on(`api-${emitterId}`, callbackGenerator(emitterId, resolve));
  });
}

export function setRelationships(relationships: any) {
  return new Promise((resolve, reject) => {
    const emitterId = nanoid();
    ipc.of.Clout.emit('api', {
      emitterId,
      relationships,
      type: 'relationships',
    });

    ee.on(`api-${emitterId}`, callbackGenerator(emitterId, resolve));
  });
}

export function emit(channel: string, values: any) {
  console.log('WTF', values);
  return new Promise((resolve, reject) => {
    const emitterId = nanoid();
    ipc.of.Clout.emit(channel, {
      emitterId,
      ...values,
    });

    // const cb = function (doc: any) {
    //   ee.removeListener(`api-${emitterId}`, cb);

    //   resolve(doc);
    // };
    // ee.on(`api-${emitterId}`, cb);

    ee.on(`api-${emitterId}`, callbackGenerator(emitterId, resolve));
  });
}

export function getIpc() {
  return ipc;
}

export function setIpcId(id: string) {
  ipc.config.id = id;
}
