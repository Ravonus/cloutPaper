/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-08-01 10:14:58 pm
 * @copyright TechnomancyIT
 */
import globalKeys from 'iohook';
import keycode from 'keycode';
import { BrowserWindow, screen, ipcMain } from 'electron';

import { displayWindows } from '../windows/cloutTop';

interface BrowserWindowExtended extends BrowserWindow {
  displayId?: number;
  index?: string;
}

const symbols: { [key: string]: string } = {
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

const displays = screen.getAllDisplays();
// const displayWindows: BrowserWindowExtended[] = [];

function capitalizeFirstLetter(string?: string) {
  if (!string) return;
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function grabWindowByDisplayId(
  display: Electron.Display,
  adjustedPoint: Electron.Point
) {
  let { x, y } = adjustedPoint;
  let windows: BrowserWindowExtended[] = [];
  let found = false;

  displayWindows.map((window, i) => {
    if (window.displayId === display.id) {
      windows.push(displayWindows[i]);

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
  const adjustedPoint = screen.getCursorScreenPoint();
  const mousePointerDisplay = screen.getDisplayNearestPoint(adjustedPoint);

  return { mousePointerDisplay, adjustedPoint };
}

interface ioHook {
  (verbose?: boolean): void;
}

export const ioHookHandle: ioHook = function (verbose) {
  globalKeys.removeAllListeners();

  globalKeys.on('mousemove', (event: any) => {
    const { mousePointerDisplay, adjustedPoint } = grabDisplay();

    const { windows, point } = grabWindowByDisplayId(
      mousePointerDisplay,
      adjustedPoint
    );

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

  globalKeys.on('mousedrag', (event: any) => {
    const { mousePointerDisplay, adjustedPoint } = grabDisplay();

    const { windows, point } = grabWindowByDisplayId(
      mousePointerDisplay,
      adjustedPoint
    );

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

  globalKeys.on('mouseup', (event: any) => {
    if (event.button === 1) {
      const { mousePointerDisplay, adjustedPoint } = grabDisplay();

      const { windows, point } = grabWindowByDisplayId(
        mousePointerDisplay,
        adjustedPoint
      );

      windows.map((window) => {
        // const { x, y } = point;
        // window.webContents.sendInputEvent({
        //   type: 'mouseUp',
        //   x,
        //   y,
        //   button: 'left',
        //   clickCount: 1,
        // });
        window?.webContents.send('mouseup', point);
      });
    }
  });

  globalKeys.on('mousedown', (event: any) => {
    if (event.button === 1) {
      const { mousePointerDisplay, adjustedPoint } = grabDisplay();

      const { windows, point } = grabWindowByDisplayId(
        mousePointerDisplay,
        adjustedPoint
      );

      windows.map((window) => {
        // const { x, y } = point;
        // window.webContents.sendInputEvent({
        //   type: 'mouseDown',
        //   x,
        //   y,
        //   button: 'left',
        //   clickCount: 1,
        // });
        window?.webContents.send('mousedown', point);
      });
    }
  });

  globalKeys.on('keydown', (event: any) => {
    console.log('DOWN');
    const { mousePointerDisplay, adjustedPoint } = grabDisplay();

    const { windows } = grabWindowByDisplayId(
      mousePointerDisplay,
      adjustedPoint
    );

    try {
      let key =
        keycode(event.rawcode) && keycode(event.rawcode).length > 1
          ? capitalizeFirstLetter(keycode(event.rawcode))
          : keycode(event.rawcode);

      if (key === 'Space') key = ' ';

      if (event.ctrlKey) {
        key = `CommandOrControl+${capitalizeFirstLetter(key)}`;
      }

      if (event.altKey) {
        key = `Alt+${key}`;
      }
      if (event.shiftKey) {
        if (!key) return;
        else if (key.match(/[^\w\*]/) || parseInt(key).toString() !== 'NaN') {
          key = symbols[key];
        } else {
          key = capitalizeFirstLetter(key);
        }
      }

      windows.map((window) => {
        window.webContents.send('keydown', key);
      });
    } catch (e) {
      console.log(e);
    }
  });

  globalKeys.on('keyup', (event: any) => {
    const { mousePointerDisplay, adjustedPoint } = grabDisplay();

    const { windows } = grabWindowByDisplayId(
      mousePointerDisplay,
      adjustedPoint
    );

    try {
      let key =
        keycode(event.rawcode) && keycode(event.rawcode).length > 1
          ? capitalizeFirstLetter(keycode(event.rawcode))
          : keycode(event.rawcode);

      if (key === 'Space') key = ' ';

      if (event.ctrlKey) {
        key = `CommandOrControl+${capitalizeFirstLetter(key)}`;
      }

      if (event.altKey) {
        key = `Alt+${key}`;
      }

      if (event.shiftKey) {
        if (!key) return;
        if (parseInt(key).toString() !== 'NaN') {
          key = keycode(event.keycode);
        } else {
          key = capitalizeFirstLetter(key);
        }
      }

      windows.map((window) => {
        window?.webContents.send('keyup', key);
      });
    } catch (e) {
      console.log(e);
    }
  });

  globalKeys.start(verbose);
};
