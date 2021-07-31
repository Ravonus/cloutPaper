import { BrowserWindow } from 'electron';
/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-07-29 9:54:08 pm
 * @copyright TechnomancyIT
 */

export default function () {
  let window: null | BrowserWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegrationInSubFrames: true,
      webviewTag: true,
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      webSecurity: false,
    },
    fullscreen: true,
    type: 'desktop',
    transparent: true,
    frame: false,
  });
}
