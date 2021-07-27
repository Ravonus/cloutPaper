import { FC } from 'react';
import BottomBar from '../../components/BottomBar';

interface VideoProps {
  darkmode: boolean;
}

export const AddVideo: FC<VideoProps> = ({ darkmode }) => {
  return (
    <div className='text-center l flex flex-col justify justify-center dark:text-primary'>
      Video I AM DAWG IMAGE I AM...
      <BottomBar
        buttonNames={['home', 'library', 'scenes', 'addImage', 'addUrl']}
        darkmode={darkmode}
      ></BottomBar>
    </div>
  );
};

export default AddVideo;
