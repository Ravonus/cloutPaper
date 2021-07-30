import { LibrarySceneCreationAttributes } from './../models/LibraryScene';
/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-26 10:46:56 pm
 * @copyright TechnomancyIT
 */
import { BrowserWindow, screen, ipcMain } from 'electron';
import path from 'path';
import wallpaper from 'electron-wallpaper-napi';
import globalKeys from 'iohook';
import keycode from 'keycode';
import LibraryScene from '../models/LibraryScene';
import Scene from '../models/Scene';
import { asyncForEach } from '../functions';
import Library from '../models/Library';
//Configuration is auto generated by YML script inside craco.config.js

interface WallpaperProps {}

interface BrowserWindowExtended extends BrowserWindow {
  displayId?: number;
}

const displays = screen.getAllDisplays();

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function grabWindowByDisplayId(
  display: Electron.Display,
  adjustedPoint: Electron.Point
) {
  let index = 0;
  let { x, y } = adjustedPoint;
  let found = false;
  displayWindows.map((window, i) => {
    if (window.displayId === display.id) {
      index = i;
      found = true;
    } else if (!found) {
      const size = window.getSize();

      x = x - size[0];
    }
  });

  return { window: displayWindows[index], point: { x, y } };
}

function grabDisplay() {
  const adjustedPoint = screen.getCursorScreenPoint();
  const mousePointerDisplay = screen.getDisplayNearestPoint(adjustedPoint);

  return { mousePointerDisplay, adjustedPoint };
}

const displayWindows: BrowserWindowExtended[] = [];

export default async () => {
  const scenes = await Scene.findAll({ where: { enabled: true } });
  const scene = scenes[scenes.length - 1];
  const libraryScenes = await LibraryScene.findAll({
    where: { sceneId: scene?.id },
  });

  await asyncForEach(libraryScenes, async (scene: LibraryScene) => {
    const library = await scene.$get('library');

    const displayIndex =
      typeof scene?.monitors === 'string' ? scene.monitors.split(',') : '';

    if (!displayIndex) return;

    displayIndex.map((i) => {
      const display = displays[Number(i)];

      let window: null | BrowserWindowExtended = new BrowserWindow({
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

      window.setBounds(display.bounds);
      window.setKiosk(true);
      //window.webContents.openDevTools();
      window.webContents.on('did-navigate', () => {
        setTimeout(() => {
          wallpaper.attachWindow(window);
        }, 100);
      });

      let url = library?.path;
      window?.loadURL(
        `file://${__dirname}/index.html?url=${url}&displayIndex=${i}&bg=background-color: rgba(255, 255, 255, 0) !important; background: rgba(255, 255, 255, 0) !important;`
      );

      window.displayId = display.id;

      displayWindows.push(window);
    });

    ipcMain.handle('setWallpaper', (event, { url, display, bg }) => {
      displayWindows[display]?.loadURL(
        `file://${__dirname}/index.html?url=${url}&displayIndex=${display}&bg=${bg}`
      );

      return true;
    });

    globalKeys.on('mousemove', (event: any) => {
      const { mousePointerDisplay, adjustedPoint } = grabDisplay();

      const { window, point } = grabWindowByDisplayId(
        mousePointerDisplay,
        adjustedPoint
      );

      window?.webContents.send('mousemove', point);
    });

    globalKeys.on('mousedrag', (event: any) => {
      const { mousePointerDisplay, adjustedPoint } = grabDisplay();

      const { window, point } = grabWindowByDisplayId(
        mousePointerDisplay,
        adjustedPoint
      );
      window?.webContents.send('mousemove', point);
    });

    globalKeys.on('mouseup', (event: any) => {
      if (event.button === 1) {
        const { mousePointerDisplay, adjustedPoint } = grabDisplay();

        const { window, point } = grabWindowByDisplayId(
          mousePointerDisplay,
          adjustedPoint
        );

        window?.webContents.send('mouseup', point);
      }
    });

    globalKeys.on('mousedown', (event: any) => {
      if (event.button === 1) {
        const { mousePointerDisplay, adjustedPoint } = grabDisplay();

        const { window, point } = grabWindowByDisplayId(
          mousePointerDisplay,
          adjustedPoint
        );

        window?.webContents.send('mousedown', point);
      }
    });

    globalKeys.on('keydown', (event: any) => {
      const { mousePointerDisplay, adjustedPoint } = grabDisplay();

      const { window } = grabWindowByDisplayId(
        mousePointerDisplay,
        adjustedPoint
      );

      try {
        let key =
          keycode(event.rawcode).length > 1
            ? capitalizeFirstLetter(keycode(event.rawcode))
            : keycode(event.rawcode);

        if (key === 'Space') key = ' ';

        window?.webContents.send('keydown', key);
      } catch (e) {
        console.log(e);
      }
    });

    //Register and start hook
    globalKeys.start(false);
  });

  // displays.map((display, i) => {
  //   let window: null | BrowserWindowExtended = new BrowserWindow({
  //     webPreferences: {
  //       nodeIntegrationInSubFrames: true,
  //       webviewTag: true,
  //       nodeIntegration: true,
  //       enableRemoteModule: true,
  //       contextIsolation: false,
  //       webSecurity: false,
  //     },
  //     fullscreen: true,
  //     type: 'desktop',
  //     transparent: true,
  //     frame: false,
  //   });

  //   window.setBounds(display.bounds);
  //   window.setKiosk(true);
  //   //window.webContents.openDevTools();
  //   window.webContents.on('did-navigate', () => {
  //     setTimeout(() => {
  //       wallpaper.attachWindow(window);
  //     }, 100);
  //   });

  //   let url = 'http://html5wallpaper.com/wp-depo/264/';
  //   window?.loadURL(
  //     `file://${__dirname}/index.html?url=${url}&displayIndex=${i}&bg=background-color: rgba(255, 255, 255, 0) !important; background: rgba(255, 255, 255, 0) !important;`
  //   );

  //   window.displayId = display.id;

  //   displayWindows.push(window);
  // });

  // ipcMain.handle('setWallpaper', (event, { url, display, bg }) => {
  //   displayWindows[display]?.loadURL(
  //     `file://${__dirname}/index.html?url=${url}&displayIndex=${display}&bg=${bg}`
  //   );

  //   return true;
  // });

  // globalKeys.on('mousemove', (event: any) => {
  //   const { mousePointerDisplay, adjustedPoint } = grabDisplay();

  //   const { window, point } = grabWindowByDisplayId(
  //     mousePointerDisplay,
  //     adjustedPoint
  //   );

  //   window?.webContents.send('mousemove', point);
  // });

  // globalKeys.on('mousedrag', (event: any) => {
  //   const { mousePointerDisplay, adjustedPoint } = grabDisplay();

  //   const { window, point } = grabWindowByDisplayId(
  //     mousePointerDisplay,
  //     adjustedPoint
  //   );
  //   window?.webContents.send('mousemove', point);
  // });

  // globalKeys.on('mouseup', (event: any) => {
  //   if (event.button === 1) {
  //     const { mousePointerDisplay, adjustedPoint } = grabDisplay();

  //     const { window, point } = grabWindowByDisplayId(
  //       mousePointerDisplay,
  //       adjustedPoint
  //     );

  //     window?.webContents.send('mouseup', point);
  //   }
  // });

  // globalKeys.on('mousedown', (event: any) => {
  //   if (event.button === 1) {
  //     const { mousePointerDisplay, adjustedPoint } = grabDisplay();

  //     const { window, point } = grabWindowByDisplayId(
  //       mousePointerDisplay,
  //       adjustedPoint
  //     );

  //     window?.webContents.send('mousedown', point);
  //   }
  // });

  // globalKeys.on('keydown', (event: any) => {
  //   const { mousePointerDisplay, adjustedPoint } = grabDisplay();

  //   const { window } = grabWindowByDisplayId(
  //     mousePointerDisplay,
  //     adjustedPoint
  //   );

  //   try {
  //     let key =
  //       keycode(event.rawcode).length > 1
  //         ? capitalizeFirstLetter(keycode(event.rawcode))
  //         : keycode(event.rawcode);

  //     if (key === 'Space') key = ' ';

  //     window?.webContents.send('keydown', key);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // });

  // //Register and start hook
  // globalKeys.start(false);
};
