console.log('I RUNS');

import { useEffect, useState } from 'react';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { useHistory } from 'react-router';

import { getMaterialFileIcon } from 'file-extension-icon-js';
// //Database models

import { Scenes, AddScene } from './scenes/';

import { Library, AddImage, AddUrl, AddVideo } from './library/';

import BottomBar from '../components/BottomBar';
import { FileUploadOverlay } from './Overlays';

interface MainProps {
  setRoute: Function;
  setRoutePage: Function;
  setPage: Function;
  addPluginMenu: Function;
  darkmode: boolean;
}

const Main: FC<MainProps> = ({
  setRoute,
  setRoutePage,
  setPage,
  addPluginMenu,
  darkmode,
}) => {
  const history = useHistory();
  const menu = [
    {
      name: 'plugins_ARPaper_scenes',
      pluginName: 'ARPaper',
      el: (
        <NavLink
          onClick={() => setPage(`plugins_ARPaper_scenes`)}
          className='navButton'
          to='plugins_ARPaper_scenes'
          id='plugins_ARPaper_scenes'
        >
          <div
            data-tip={'ARPaper Scenes'}
            className='hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer'
            style={{ width: 46, height: 34 }}
          >
            <ReactTooltip />
            <img
              className='ml-3 my-2 relative'
              style={{
                width: 24,
                height: 24,
                top: 5,
                filter:
                  'invert(48%) sepia(29%) saturate(2476%) hue-rotate(190deg) brightness(118%) contrast(119%) drop-shadow(-0.5px -0.5px 0 black) drop-shadow(0.5px 0.5px 0 black)',
              }}
              src='../assets/icons/iconmonstr-computer-2.svg'
              alt='S'
            />
          </div>
        </NavLink>
      ),
    },
    {
      name: 'plugins_ARPaper_library',
      pluginName: 'ARPaper',
      el: (
        <NavLink
          onClick={() => setPage(`plugins_ARPaper_library`)}
          className='navButton'
          to='plugins_ARPaper_library'
          id='plugins_ARPaper_library'
        >
          <div
            data-tip={'ARPaper Library'}
            className='hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer'
            style={{ width: 46, height: 34 }}
          >
            <ReactTooltip />
            <img
              className='ml-3 my-2 relative'
              style={{
                width: 24,
                height: 24,
                top: 5,
                filter:
                  'invert(48%) sepia(29%) saturate(2476%) hue-rotate(190deg) brightness(118%) contrast(119%) drop-shadow(-0.5px -0.5px 0 black) drop-shadow(0.5px 0.5px 0 black)',
              }}
              src='../assets/icons/iconmonstr-layer-22.svg'
              alt='S'
            />
          </div>
        </NavLink>
      ),
    },
  ];

  const drop = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (!event.dataTransfer) return;

    for (const f of event?.dataTransfer.files) {
      // Using the path attribute to get absolute file path
      const logo = getMaterialFileIcon(f.name);
      console.log(logo);
      const type = f.type.split('/')[0];

      switch (type) {
        case 'image':
          history.push('/plugins_ARPaper_library');

        default:
          break;
      }

      console.log('File Path of dragged files: main ', f.path);
    }
  };

  document.removeEventListener('drag', drop);
  document.addEventListener('drop', drop);

  useEffect(() => {
    addPluginMenu(menu[1], 'plugins_ARPaper_library', {
      route: {
        name: 'library',
        path: '/plugins_ARPaper_library',
        component: 'Library',
      },

      component: Library,
    });
    addPluginMenu(menu[0], 'plugins_ARPaper_scenes', {
      route: {
        name: 'scenes',
        path: '/plugins_ARPaper_scenes',
        component: 'Scenes',
      },
      component: Scenes,
    });
    setRoutePage(
      {
        name: 'library',
        path: '/plugins_ARPaper_library',
        component: 'Library',
      },
      Library
    );
    setRoutePage(
      {
        name: 'scenes',
        path: '/plugins_ARPaper_scenes',
        component: 'Scenes',
      },
      Scenes
    );
    setRoutePage(
      {
        name: 'addImage',
        path: '/plugins_ARPaper_addImage',
        component: 'AddImage',
      },
      AddImage
    );
    setRoutePage(
      {
        name: 'addUrl',
        path: '/plugins_ARPaper_addUrl',
        component: 'AddUrl',
      },
      AddUrl
    );
    setRoutePage(
      {
        name: 'addVideo',
        path: '/plugins_ARPaper_addVideo',
        component: 'AddVideo',
      },
      AddVideo
    );
    setRoutePage(
      {
        name: 'addScene',
        path: '/plugins_ARPaper_addScene',
        component: 'AddScene',
      },
      AddScene
    );
  }, []);

  return (
    <div className='text-center l flex flex-col justify justify-center dark:text-primary'>
      I PLUGIN MAIN WALLPAPERS = ❤ and no fucking way!z
      {/* <img src={ScenesIcon.default} className='w-10 h-10' alt='' /> */}
      <BottomBar
        buttonNames={[
          'library',
          'scenes',
          'addScene',
          'addImage',
          'addUrl',
          'addVideo',
        ]}
        darkmode={darkmode}
      ></BottomBar>
    </div>
  );
};

export default Main;
