import { ipcRenderer, remote } from 'electron/renderer';
import { FC, useEffect, useState } from 'react';
import BottomBar from '../../components/BottomBar';
import { PrimaryButton, SecondaryButton } from '../../components/buttons/index';
import { InputFloat } from '../../components/Inputs';
import ColorPicker from 'mb-react-color-picker';
import { emit } from '../../../main/ipc';

const { screen, getCurrentWindow } = remote;

const displays = screen.getAllDisplays();

interface UrlProps {
  darkmode: boolean;
}

export const AddUrl: FC<UrlProps> = ({ darkmode }) => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('rgba(0, 0, 0, 1)');

  useEffect(() => {
    console.log('URL CHANGED', url);
  }, [url]);

  async function createLibraryItem() {
    const info = await ipcRenderer.invoke('apiMain', {
      values: {
        type: 'html5',
        path: url,
        title,
        description,
        extra: { bg: color },
      },
      table: 'Library',
      method: 'create',
      type: 'database',
    });

    // const info = await emit('api', {
    //   values: {
    //     type: 'html5',
    //     path: url,
    //     title,
    //     description,
    //     extra: { bg: color },
    //   },
    //   table: 'Library',
    //   method: 'create',
    //   type: 'database',
    // });
  }

  return (
    <div className='dark:text-primary container pb-12'>
      <div>
        <div style={{ width: 500 }} className='inline-block'></div>
        <InputFloat
          label='Website'
          name='website'
          id='website'
          value={url}
          setValue={setUrl}
        />
        <InputFloat
          label='Title'
          name='title'
          id='title'
          value={title}
          setValue={setTitle}
        />
        <InputFloat
          type='textarea'
          label='Description'
          name='description'
          id='description'
          value={description}
          setValue={setDescription}
        />
        <ColorPicker
          headerText='CSS Background'
          color={color}
          onChange={(color: any) => {
            setColor(color.target ? color.target.value : color);
          }}
          onConfirm={(color: any) => {
            setColor(color);
          }}
          style={{ position: 'unset' }}
        />
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
              const value = (
                document.getElementById('website') as HTMLInputElement
              ).value;

              ipcRenderer.invoke('setWallpaper', {
                url,
                display: i,
                bg: `background-color: ${color} !important; background: ${color} !important;`,
              });
              // ipcRenderer.send(
              //   'setWallpaper',
              //   'http://html5wallpaper.com/wp-depo/800/'
              // );
            }}
          />
        );
      })}
      <button
        onClick={createLibraryItem}
        className='bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center inline-block'
      >
        <svg
          className='w-4 h-4 mr-2'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
        >
          <path d='M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z' />
        </svg>
        <span>Create</span>
      </button>
      <div className='mb-6'></div>
      <BottomBar
        buttonNames={['home', 'library', 'scenes', 'addImage', 'addVideo']}
        darkmode={darkmode}
      ></BottomBar>
    </div>
  );
};

export default AddUrl;
