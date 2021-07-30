import { FC, useEffect, useState } from 'react';
import BottomBar from '../../components/BottomBar';
import Select from 'react-select';
import { ipcRenderer } from 'electron/renderer';
import { LibraryAttributes } from '../../models/Library';
import { PrimaryButton, SecondaryButton } from '../../components/buttons/index';
import { SceneCreationAttributes } from '../../models/Scene';
import { InputFloat } from '../../components/Inputs';
import { LibrarySceneCreationAttributes } from '../../models/LibraryScene';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
interface SceneProps {
  darkmode: boolean;
}

export const AddScene: FC<SceneProps> = ({ darkmode }) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState({ value: 0, label: '' });
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    (async () => {
      const result = await ipcRenderer.invoke('database', {
        type: 'read',
        model: 'Library',
      });
      let optionList: any = [];
      result.map((result: LibraryAttributes) => {
        optionList.push({ value: result.id, label: result.title });
      });

      console.log('RAN', optionList);

      setOptions(optionList);
      setSelectedOption(optionList[0]);
    })();
  }, []);

  const handleChange = (selectedOption: any) => {
    setSelectedOption(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };

  return (
    <div className='dark:text-primary container'>
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

      <SecondaryButton
        text={'Create'}
        onClick={async () => {
          // const windows = await ipcRenderer.invoke('windows', '');
          // console.log('WINDOWS', windows);
          // // const windows = await grabWindows();
          // windows?.webContents.send(
          //   'setWallpaper',
          //   'http://html5wallpaper.com/wp-depo/800/'
          // );

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

          if (!info.doc) {
          } else {
            const values: LibrarySceneCreationAttributes = {
              libraryId: selectedOption.value,
              sceneId: info.doc.id,
              enabled: true,
              monitors: [0, 1],
            };
            const libraryScene = await ipcRenderer.invoke('apiMain', {
              values,
              table: 'LibraryScene',
              method: 'create',
              type: 'database',
            });
            console.log('DONE', libraryScene);
          }

          // ipcRenderer.send(
          //   'setWallpaper',
          //   'http://html5wallpaper.com/wp-depo/800/'
          // );
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
