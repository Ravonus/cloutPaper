/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-27 10:08:37 pm
 * @copyright TechnomancyIT
 */

import { ipcMain } from 'electron';
import path from 'path';
import sendIpc from '../src/ipc/sendIpc';
import wp from '../src/windows/cloutTop';
import { setIpcId, setRelationships } from './ipc';

let connectionId: string;

console.log('masd', __dirname);
const {
  emit,
  getIpc,
  ipcStart,
  ipcRegisterModels,
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
  sendIpc;
  const registration = await ipcStart({ id: connectionId });

  await ipcRegisterModels({
    models: [
      path.join(__dirname, '../', 'src/models/', 'Library.js'),
      path.join(__dirname, '../', 'src/models/', 'Scene.js'),
      path.join(__dirname, '../', 'src/models/', 'LibraryScene.js'),
    ],
    type: 'addModels',
  });

  // await setRelationships([
  //   {
  //     type: 'hasOne',
  //     model: 'Library',
  //     relationshipModel: 'Scene',
  //     opts: {
  //       foreignKey: 'sceneId',
  //     },
  //   },
  // ]);

  // await ipcRegisterLibraryModel({
  //   models: path.join(__dirname, '../', 'src/models/', 'Library.js'),
  //   type: 'addModels',
  // });

  // ipcMain.inv('setWallpaper');
  wp();
}

export default async function (id: string) {
  connectionId = id;

  await init();
}
