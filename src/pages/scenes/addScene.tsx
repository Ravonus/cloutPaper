import { FC } from 'react';
import BottomBar from '../../components/BottomBar';

interface SceneProps {
  darkmode: boolean;
}

export const AddScene: FC<SceneProps> = ({ darkmode }) => {
  return (
    <div className='text-center l flex flex-col justify justify-center dark:text-primary'>
      ADDING SCENES I AM DAWG IMAGE I AM...
      <BottomBar
        buttonNames={['home', 'library', 'scenes']}
        darkmode={darkmode}
      ></BottomBar>
    </div>
  );
};

export default AddScene;
