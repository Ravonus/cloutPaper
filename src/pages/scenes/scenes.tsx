import { FC } from 'react';
import BottomBar from '../../components/BottomBar';

interface MainProps {
  darkmode: boolean;
}

export const Scenes: FC<MainProps> = ({ darkmode }) => {
  return (
    <div className='text-center l flex flex-col justify justify-center dark:text-primary'>
      I PLUGIN MAIN WALLPAPERS - Scenes page = ❤{' '}
      <BottomBar
        buttonNames={['home', 'library', 'addScene']}
        darkmode={darkmode}
      ></BottomBar>
    </div>
  );
};

export default Scenes;
