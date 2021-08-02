/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-29 2:57:11 am
 * @copyright TechnomancyIT
 */
import { ipcMain } from 'electron';

import cloutTop from '../windows/cloutTop';

export default ipcMain.handle('cloutTop', async (event, opts) => {
  cloutTop();
});
