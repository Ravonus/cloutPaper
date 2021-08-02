//TODO: Add Settings to active side nav check.

import { FC, useEffect, useState } from 'react';
import { remote, ipcRenderer } from 'electron';

import querystring from 'querystring';
import { renderInputHandle } from '../libs/renderInputHandle';

// let data = JSON.parse(query['?data']);

interface ExternalProps {}

interface HTMLElementExtended extends HTMLElement {
  insertCSS: any;
  sendInputEvent: any;
}

const { BrowserWindow, screen } = remote;

const query: any = querystring.parse(global.location.search);

const displayIndex: number = query.displayIndex;
const bg = query.bg;

let firstRun = true;

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const External: FC<ExternalProps> = () => {
  const [site, setSite] = useState(query['?url']);
  const displays = screen.getAllDisplays();

  async function findWebview(displays: any) {
    let webview: HTMLElementExtended = document.getElementById(
      'foo'
    ) as HTMLElementExtended;

    if (!webview) {
      console.log('NO FOUND');
      await wait(1000);
      webview = await findWebview(displays);
      return webview;
    }

    webview.addEventListener('did-stop-loading', function () {
      if (!firstRun) return;

      firstRun = false;
      ipcRenderer.removeAllListeners('mouseup');
      ipcRenderer.removeAllListeners('mousedown');
      ipcRenderer.removeAllListeners('keydown');
      webview.insertCSS(
        `html,body{ overflow:hidden; ${bg}}, ::-webkit - scrollbar{display: none;}`
      );

      setTimeout(() => {
        // webview.sendInputEvent({ type: 'mouseDown', x: 1263, y: 730, button: 'left', clickCount: 100 });
        // webview.sendInputEvent({ type: 'mouseUp', x: 1263, y: 730, button: 'left', clickCount: 1 });
        var b = document.body;
        b.addEventListener(
          'click',
          function (event) {
            console.log('TERDS');
            console.log(event.pageX, event.pageY);
          },
          false
        );
        //   webview.sendInputEvent({ type: 'mouseUp', x: 1263, y: 730, button: 'left', globalX: 1263, globalY: 730 });
        webview.insertBefore;
      }, 5000);

      //webview.openDevTools();

      renderInputHandle(webview);
    });

    // webview.style.width = '1'
    webview.style.width = `${displays[displayIndex].size.width}px`;
    webview.style.height = `${displays[displayIndex].size.height}px`;
    return webview;
  }

  ipcRenderer.on('setWallpaper', (event, result) => {
    console.log(result);
    setSite(result);
    remote.getCurrentWindow().reload();
  });

  useEffect(() => {
    findWebview(displays);
  }, []);

  return <webview id='foo' src={site}></webview>;
};

export default External;
