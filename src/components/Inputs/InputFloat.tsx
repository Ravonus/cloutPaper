import { FC, useState, ChangeEvent } from 'react';

interface InputProps {
  label: string;
  id?: string;
  name?: string;
  value?: string;
  setValue?: any;
}

export const InputFloat: FC<InputProps> = ({
  id,
  name,
  label,
  value,
  setValue,
}) => {
  const [localValue, setLocalValue] = useState(value || '');

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event?.target.value;
    setValue(value);
    setLocalValue(value);
  }

  return (
    <>
      <div
        className={`relative h-10 input-component focus:outline-none mb-5 ${
          localValue === '' || !localValue ? 'empty' : ''
        }`}
      >
        <input
          onChange={handleChange}
          id={id || ''}
          type='text'
          name={name || ''}
          className='outline-none h-full w-full px-2 transition-all border-secondary dark:border-primary rounded-sm bg-transparent dark:text-primary text-black focus:ring-0 group'
          value={localValue}
        />
        <label
          htmlFor={name || ''}
          className='absolute left-2 transition-all px-1 bg-transparent dark:text-white group-focus:text-primary text-secondary'
        >
          {label}
        </label>
      </div>
    </>
  );
};

export default InputFloat;
