//TODO: Add Settings to active side nav check.

import { FC, useEffect, useState } from 'react';
import { remote, ipcRenderer } from 'electron';

import querystring from 'querystring';
import { renderInputHandle } from '../libs/renderInputHandle';

// let data = JSON.parse(query['?data']);

interface ExternalProps {}

const { BrowserWindow, screen } = remote;

const query: any = querystring.parse(global.location.search);

const displayIndex: number = query.displayIndex;
const bg = query.bg;

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function findWebview(displays: any) {
  const webview: any = document.getElementById('foo');

  if (!webview) {
    await wait(100);
    findWebview(displays);
  }

  webview.addEventListener('did-stop-loading', loadstop);

  function loadstop() {
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
          console.log(event.pageX, event.pageY);
        },
        false
      );
      //   webview.sendInputEvent({ type: 'mouseUp', x: 1263, y: 730, button: 'left', globalX: 1263, globalY: 730 });
      webview.insertBefore;
    }, 5000);
  }

  // webview.openDevTools();

  renderInputHandle(webview);

  // ipcRenderer.on('mousedown', (event, result) => {
  //   let { x, y } = result;

  //   webview.sendInputEvent({
  //     type: 'mousedown',
  //     x,
  //     y,
  //     button: 'left',
  //     clickCount: 1,
  //   });
  // });

  // ipcRenderer.on('mouseup', (event, result) => {
  //   let { x, y } = result;

  //   webview.sendInputEvent({
  //     type: 'mouseup',
  //     x,
  //     y,
  //     button: 'left',
  //     clickCount: 1,
  //   });
  // });

  // ipcRenderer.on('keydown', (event, keyCode) => {
  //   webview.sendInputEvent({
  //     type: keyCode.length > 1 ? 'keyUp' : 'char',
  //     keyCode,
  //   });
  // });

  // ipcRenderer.on('keyup', (event, keyInfo) => {
  //   const keyCode = keyInfo.rawcode.toString();

  //   // var evt = new KeyboardEvent('keyup', { keyCode });
  //   // document.dispatchEvent(evt);
  //   webview.sendInputEvent({
  //     type: 'char',
  //     keyCode,
  //   });
  // });

  // ipcRenderer.on('mousemove', (event, result) => {
  //   const { x, y } = result;

  //   webview.sendInputEvent({
  //     type: 'mousemove',
  //     x,
  //     y,
  //   });
  // });

  // webview.style.width = '1'
  webview.style.width = `${displays[displayIndex].size.width}px`;
  webview.style.height = `${displays[displayIndex].size.height}px`;
}

export const External: FC<ExternalProps> = () => {
  const [site, setSite] = useState(query['?url']);
  const displays = screen.getAllDisplays();

  ipcRenderer.on('setWallpaper', (event, result) => {
    console.log(result);
    setSite(result);
    remote.getCurrentWindow().reload();
  });

  useEffect(() => {
    findWebview(displays);
  });

  return <webview id='foo' src={site}></webview>;
};

export default External;
