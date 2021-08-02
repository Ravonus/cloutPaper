import { FC, useEffect, useState } from 'react';
import BottomBar from '../../components/BottomBar';
import Select from 'react-select';
import { ipcRenderer, remote } from 'electron/renderer';
import { LibraryAttributes } from '../../models/Library';
import { PrimaryButton, SecondaryButton } from '../../components/buttons/index';
import { SceneCreationAttributes } from '../../models/Scene';
import { InputFloat } from '../../components/Inputs';
import { LibrarySceneCreationAttributes } from '../../models/LibraryScene';
import Side from '../../components/Side';

import { asyncForEach } from '../../functions';

const { screen } = remote;

interface SceneProps {
  darkmode: boolean;
}

interface OptionsAttributes {
  value: number;
  label?: string;
}

interface SelectedOptionAttributes {
  value: number;
  label?: string;
}

export const AddScene: FC<SceneProps> = ({ darkmode }) => {
  const [options, setOptions] = useState<OptionsAttributes[]>([]);
  const [displays, setDisplays] = useState<Electron.Display[]>(
    screen.getAllDisplays()
  );
  const [openPanel, setOpenPanel] = useState(false);
  const [docs, setDocs] = useState<{ [key: string]: LibraryAttributes }>({});
  const [selectedDoc, setSelectedDoc] = useState<LibraryAttributes>();
  const [selectedOption, setSelectedOption] = useState<OptionsAttributes>();
  const [monitorThumb, setMonitorThumb] = useState<{ [key: string]: number[] }>(
    {}
  );
  const [selectedOptions, setSelectedOptions] = useState<
    SelectedOptionAttributes[]
  >([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    (async () => {
      const result = await ipcRenderer.invoke('database', {
        type: 'read',
        model: 'Library',
      });
      const docs: { [key: string]: LibraryAttributes } = {};
      let optionList: any = [];
      result.map((result: LibraryAttributes) => {
        docs[result.title.replaceAll(' ', '')] = result;
        optionList.push({ value: result.id, label: result.title });
      });
      setDocs(docs);
      setOptions(optionList);
      setSelectedOption(optionList[0]);
    })();
  }, []);

  const handleChange = async (selectedOption: any) => {
    const options = selectedOptions;

    let notFound = true;

    if (options.some((doc) => doc.value === selectedOption.value))
      notFound = false;

    if (notFound) {
      options.push(selectedOption);
    } else {
      const removeIndex = options.findIndex(
        (item) => item.value === selectedOption.value
      );
      options.splice(removeIndex, 1);
    }

    await setSelectedOptions([...options, { value: 13371337 }]);
    await setSelectedOptions(options);
  };

  async function handleThumbClick(i: number) {
    if (!selectedDoc) return;
    if (
      monitorThumb[selectedDoc.id] &&
      monitorThumb[selectedDoc.id].includes(i)
    ) {
      const index = monitorThumb[selectedDoc.id].indexOf(i);
      monitorThumb[selectedDoc.id].splice(index, 1);
    } else if (!monitorThumb[selectedDoc.id]) {
      monitorThumb[selectedDoc.id] = [i];
    } else {
      monitorThumb[selectedDoc.id].push(i);
    }
    await setMonitorThumb(monitorThumb);
    const cacheDisplays = displays;
    await setDisplays([]);
    await setDisplays(cacheDisplays);
  }

  return (
    <div className='dark:text-primary container'>
      <Side title={selectedDoc?.title} open={openPanel} setOpen={setOpenPanel}>
        <div className='flex justify-center overflow-hidden'>
          {displays.map(function (display, i) {
            {
              return selectedDoc &&
                monitorThumb[selectedDoc.id] &&
                monitorThumb[selectedDoc.id].includes(i) ? (
                <div
                  key={`displayThumb-${i}`}
                  id={`displayThumb-${i}`}
                  style={{
                    fontSize: 100,
                    textAlign: 'center',
                    width: 128,
                    height: 128,
                  }}
                  className='m-4 group cursor-pointer relative'
                >
                  <webview
                    style={{
                      border: 'none',
                      width: 128,
                      height: 128,
                    }}
                    id={`webview-${selectedDoc?.id}`}
                    src={selectedDoc?.path}
                  />

                  <div
                    style={{ width: 128, height: 128 }}
                    onClick={() => handleThumbClick(i)}
                    // style={{ pointerEvents: 'none' }}
                    className='absolute top-0 left-0 cursor-pointer w-32 h-32 overflow-hidden cursor-pointer border-secondary dark:border-primary border hover:border-primary dark:border dark:hover:border-secondary'
                  />
                </div>
              ) : (
                <div
                  key={`displayThumb-${i}`}
                  id={`displayThumb-${i}`}
                  style={{ fontSize: 100, textAlign: 'center' }}
                  className='cursor-pointer m-4 w-32 h-32 px-4 overflow-hidden bg-gray-200 dark:bg-gray-600 border-secondary dark:border-primary border hover:border-primary dark:border dark:hover:border-secondary hover:bg-gray-300 dark:hover:bg-gray-500'
                  onClick={() => handleThumbClick(i)}
                >
                  <span> {i + 1}</span>
                </div>
              );
            }
          })}
        </div>
      </Side>
      <div className='pt-5' style={{ width: 350 }}>
        <Select
          value={selectedOption}
          onChange={handleChange}
          options={options}
        />
      </div>
      <InputFloat
        label='Title'
        name='title'
        id='title'
        value={title}
        setValue={setTitle}
      />
      <InputFloat
        label='Description'
        name='Description'
        id='Description'
        value={description}
        setValue={setDescription}
      />
      <div className='grid grid-cols-3 gap-2'>
        {selectedOptions.map(function (selection: any, i) {
          let title = selection.label;

          try {
            title = title.replaceAll(' ', '');
          } catch (e) {
            console.log(e);
          }

          let foundDoc: LibraryAttributes = docs[title];

          return (
            <div
              className='bg-gray-300 dark:bg-gray-600 group relative cursor-pointer'
              key={`webview-${foundDoc?.id}`}
            >
              <webview
                style={{
                  border: 'none',
                  minWidth: 128,
                  minHeight: 128,
                  width: '100%',
                  height: '100%',
                }}
                id={`webview-${foundDoc?.id}`}
                src={foundDoc?.path}
              />

              <div
                onClick={() => {
                  console.log('BRING UP WINDOW FOR OPTIONS');
                  setSelectedDoc(foundDoc);
                  setOpenPanel(true);
                }}
                // style={{ pointerEvents: 'none' }}
                className='group-hover:bg-transparent bg-gray-500 bg-opacity-25 h-full w-full absolute top-0 left-0 cursor-pointer'
              />
            </div>
          );
        })}
      </div>
      <SecondaryButton
        text={'Create'}
        onClick={async () => {
          const values: SceneCreationAttributes = {
            title,
            enabled: true,
            description,
          };

          const info = await ipcRenderer.invoke('apiMain', {
            values,
            table: 'Scene',
            method: 'create',
            type: 'database',
          });

          await asyncForEach(
            selectedOptions,
            async (option: OptionsAttributes) => {
              // const windows = await ipcRenderer.invoke('windows', '');
              // console.log('WINDOWS', windows);
              // // const windows = await grabWindows();
              // windows?.webContents.send(
              //   'setWallpaper',
              //   'http://html5wallpaper.com/wp-depo/800/'
              // );

              if (!info.doc) {
              } else {
                if (!option.label) return;
                const monitors = monitorThumb[option.value];

                const values: LibrarySceneCreationAttributes = {
                  libraryId: option?.value,
                  sceneId: info.doc.id,
                  enabled: true,
                  monitors,
                };
                const libraryScene = await ipcRenderer.invoke('apiMain', {
                  values,
                  table: 'LibraryScene',
                  method: 'create',
                  type: 'database',
                });
              }

              // ipcRenderer.send(
              //   'setWallpaper',
              //   'http://html5wallpaper.com/wp-depo/800/'
              // );
            }
          );
          console.log('WTF');
          await ipcRenderer.invoke('cloutTop');
        }}
      />
      <PrimaryButton
        text={'Preview Scene'}
        onClick={async () => {
          const Scene: SceneCreationAttributes = {
            title,
            enabled: true,
            description,
          };
          let LibraryScenes: LibrarySceneCreationAttributes[] = [];

          function removeNoneSelectedDocs() {
            const items: LibraryAttributes[] = [];

            selectedOptions.map((option) => {
              if (!option.label) return;
              const doc = docs[option.label.replaceAll(' ', '')];
              items.push(doc);
            });

            return items;
          }

          await asyncForEach(
            selectedOptions,
            async (option: OptionsAttributes, i: number) => {
              if (!option.label) return;
              const monitors = monitorThumb[option.value];

              LibraryScenes.push({
                libraryId: option?.value,
                sceneId: i,
                enabled: true,
                monitors: monitors.join(','),
              });
            }
          );
          console.log('WTF');
          await ipcRenderer.invoke('cloutTop', {
            Scene,
            LibraryScenes,
            items: removeNoneSelectedDocs(),
          });
        }}
      />
      <BottomBar
        buttonNames={['home', 'library', 'scenes']}
        darkmode={darkmode}
      ></BottomBar>
    </div>
  );
};

export default AddScene;
