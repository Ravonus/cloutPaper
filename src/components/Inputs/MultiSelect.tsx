import React, { useState } from 'react';

const MultiSelect = () => {
  const [items, setItems] = useState(['john', 'milos', 'steph', 'kathreine']);
  const [selectedItems, setSelected] = useState([]);

  return (
    <div className='autcomplete-wrapper'>
      <div className='autcomplete'>
        <div className='w-full flex flex-col items-center mx-auto'>
          <div className='w-full'>
            <div className='flex flex-col items-center relative'>
              <div className='w-full '>
                <div className='my-2 p-1 flex border border-gray-200 bg-white rounded '>
                  <div className='flex flex-auto flex-wrap'>
                    {selectedItems.map((tag, index) => {
                      return (
                        <div
                          key={index}
                          className='flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-teal-700 bg-teal-100 border border-teal-300 '
                        >
                          <div className='text-xs font-normal leading-none max-w-full flex-initial'>
                            {tag}
                          </div>
                          <div className='flex flex-auto flex-row-reverse'>
                            <div></div>
                          </div>
                        </div>
                      );
                    })}
                    <div className='flex-1'>
                      <input
                        placeholder=''
                        className='bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800'
                      />
                    </div>
                  </div>
                  <div className='text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200'>
                    <button className='cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none'></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiSelect;
