/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-27 10:08:37 pm
 * @copyright TechnomancyIT
 */

import { ipcMain } from 'electron';
import path from 'path';
import wp from '../src/windows/cloutTop';
import { setIpcId } from './ipc';

let connectionId: string;

console.log('masd', __dirname);

const {
  emit,
  getIpc,
  ipcStart,
  ipcRegisterLibraryModel,
} = require(`${__dirname}/ipc`);

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

async function init() {
  const registration = await ipcStart({ id: connectionId });

  await ipcRegisterLibraryModel({
    models: path.join(__dirname, '../', 'src/models/', 'Library.js'),
    type: 'addModels',
  });

  const info = await emit('api', {
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
  wp();
  console.log('INFP', info);
}

export default async function (id: string) {
  connectionId = id;

  await init();
}
