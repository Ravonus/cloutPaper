/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-29 2:57:11 am
 * @copyright TechnomancyIT
 */
import { ipcMain } from 'electron';
import { emit } from '../../main/ipc';

export default ipcMain.handle('apiMain', async (event, opts) => {
  const info = await emit('api', opts);

  return info;
});
