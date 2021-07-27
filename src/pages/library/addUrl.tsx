import { ipcRenderer, remote } from 'electron/renderer';
import { FC, useEffect, useState } from 'react';
import BottomBar from '../../components/BottomBar';
import { PrimaryButton, SecondaryButton } from '../../components/buttons/index';
import { InputFloat } from '../../components/Inputs';

const { screen, getCurrentWindow } = remote;

const displays = screen.getAllDisplays();

interface UrlProps {
  darkmode: boolean;
}

export const AddUrl: FC<UrlProps> = ({ darkmode }) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    console.log('URL CHANGED', url);
  }, [url]);

  return (
    <div className='dark:text-primary container'>
      <div>
        <div style={{ width: 500 }} className='inline-block'>
          <InputFloat
            label='URL'
            name='url'
            id='url'
            value={url}
            setValue={setUrl}
          />
        </div>
        <button className='bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center inline-block'>
          <svg
            className='w-4 h-4 mr-2'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
          >
            <path d='M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z' />
          </svg>
          <span>Create</span>
        </button>
      </div>
      {displays.map((display, i) => {
        return (
          <SecondaryButton
            text={`Preview Display-${i}`}
            onClick={async () => {
              // const windows = await ipcRenderer.invoke('windows', '');
              // console.log('WINDOWS', windows);
              // // const windows = await grabWindows();
              // windows?.webContents.send(
              //   'setWallpaper',
              //   'http://html5wallpaper.com/wp-depo/800/'
              // );
              const value = (document.getElementById('url') as HTMLInputElement)
                .value;

              console.log('VALUE');

              ipcRenderer.invoke('setWallpaper', { url: value, display: i });
              // ipcRenderer.send(
              //   'setWallpaper',
              //   'http://html5wallpaper.com/wp-depo/800/'
              // );
            }}
          />
        );
      })}
      <BottomBar
        buttonNames={['home', 'library', 'scenes', 'addImage', 'addVideo']}
        darkmode={darkmode}
      ></BottomBar>
    </div>
  );
};

export default AddUrl;
