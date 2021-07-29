//TODO: Add Settings to active side nav check.

import { FC, useEffect, useState } from 'react';
import { remote, ipcRenderer } from 'electron';
import ScriptTag from 'react-script-tag';
import path from 'path';

import fs from 'fs';

import querystring from 'querystring';

const htmlString = fs.readFileSync(
  path.join(__dirname, '../../', 'public/test/', 'index.html'),
  'utf-8'
);
remote.getCurrentWindow();
const scriptString = fs.readFileSync(
  path.join(__dirname, '../../', 'public/test/', 'script.js'),
  'utf-8'
);

// let data = JSON.parse(query['?data']);

interface InternalProps {}

const { BrowserWindow, screen } = remote;

const query: any = querystring.parse(global.location.search);

const displayIndex: number = query.displayIndex;
const bg = query.bg;

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function findWebview(displays: any) {
  const webview: any = document.getElementById('htmlLoaded');

  if (!webview) {
    await wait(100);
    findWebview(displays);
  }

  // webview.openDevTools();
  webview.addEventListener('did-stop-loading', () => {
    console.log('FINISHEd');
  });
  ipcRenderer.on('mousedown', (event, result) => {
    let { x, y } = result;

    webview.sendInputEvent({
      type: 'mousedown',
      x,
      y,
      button: 'left',
      clickCount: 1,
    });
  });

  ipcRenderer.on('mouseup', (event, result) => {
    let { x, y } = result;

    webview.sendInputEvent({
      type: 'mouseup',
      x,
      y,
      button: 'left',
      clickCount: 1,
    });
  });

  ipcRenderer.on('keydown', (event, keyCode) => {
    webview.sendInputEvent({
      type: keyCode.length > 1 ? 'keyUp' : 'char',
      keyCode,
    });
  });

  ipcRenderer.on('keyup', (event, keyInfo) => {
    const keyCode = keyInfo.rawcode.toString();

    // var evt = new KeyboardEvent('keyup', { keyCode });
    // document.dispatchEvent(evt);
    webview.sendInputEvent({
      type: 'char',
      keyCode,
    });
  });

  ipcRenderer.on('mousemove', (event, result) => {
    const { x, y } = result;

    webview.sendInputEvent({
      type: 'mousemove',
      x,
      y,
    });
  });

  // webview.style.width = '1'
  webview.style.width = `${displays[displayIndex].size.width}px`;
  webview.style.height = `${displays[displayIndex].size.height}px`;
}

export const Internal: FC<InternalProps> = () => {
  const displays = screen.getAllDisplays();
  // eval(scriptString);

  useEffect(() => {
    findWebview(displays);
  });
  const htmlPath = `file://${path.join(
    __dirname,
    '../../',
    'public/test/',
    'index.html'
  )}`;

  console.log('HTMLPATH', htmlPath);

  return (
    <>
      <body style={{ margin: 0, padding: 0 }}>
        <webview
          id='htmlLoaded'
          src={htmlPath}
          // dangerouslySetInnerHTML={{ __html: htmlString }}
        ></webview>
      </body>
    </>
  );
};

export default Internal;
