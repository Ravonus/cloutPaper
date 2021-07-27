import { FC } from 'react';
import BottomBar from '../../components/BottomBar';

interface ImageProps {
  darkmode: boolean;
}

export const AddImage: FC<ImageProps> = ({ darkmode }) => {
  return (
    <div className='text-center l flex flex-col justify justify-center dark:text-primary'>
      IMAGE I AM DAWG IMAGE I AM...
      <BottomBar
        buttonNames={['home', 'library', 'scenes', 'addUrl', 'addVideo']}
        darkmode={darkmode}
      ></BottomBar>
    </div>
  );
};

export default AddImage;
