import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
import { FC } from 'react';
import BottomBar from '../../components/BottomBar';
import { FileUploadOverlay } from '../Overlays';

interface MainProps {
  darkmode: boolean;
  overlay: any;
}

export const Library: FC<MainProps> = ({ darkmode, overlay }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await ipcRenderer.invoke('database', {
        type: 'read',
        model: 'Library',
      });

      setItems(result);
    })();
  }, []);

  return (
    <div className='text-center l flex flex-col justify justify-center dark:text-primary'>
      {overlay && overlay['plugins_ARPaper_library'] ? (
        <FileUploadOverlay />
      ) : null}
      <div className='container grid grid-cols-3 gap-4'>
        {items.map((opt: any, i: number) => {
          return (
            <div key={`plugin-${opt.title}-${i}`}>
              {/* <WallpaperPage /> */}
              {/* <Suspense
              key={`${opt.name}-r`}
              fallback={<div className='h-screen'>terds</div>}
            >
              <Route
                render={(props) => {
                  return (
                    <>
                      <C {...props} />
                    </>
                  );
                }}
                path={`/plugins/${opt.name}`}
              />
            </Suspense> */}
              <div>{opt.title}</div>
            </div>
          );
        })}
      </div>
      <BottomBar
        buttonNames={['home', 'scenes', 'addImage', 'addUrl', 'addVideo']}
        darkmode={darkmode}
      ></BottomBar>
    </div>
  );
};

export default Library;
