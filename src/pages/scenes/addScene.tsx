import { FC, useState } from 'react';
import BottomBar from '../../components/BottomBar';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
interface SceneProps {
  darkmode: boolean;
}

export const AddScene: FC<SceneProps> = ({ darkmode }) => {
  const [options, setOptions] = useState([
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ]);
  const [selectedOption, setSelectedOption] = useState({
    value: 'chocolate',
    label: 'Chocolate',
  });

  const handleChange = (selectedOption: any) => {
    setSelectedOption(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };

  return (
    <div className='text-center l flex flex-col justify justify-center dark:text-primary'>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
      />
      <BottomBar
        buttonNames={['home', 'library', 'scenes']}
        darkmode={darkmode}
      ></BottomBar>
    </div>
  );
};

export default AddScene;
