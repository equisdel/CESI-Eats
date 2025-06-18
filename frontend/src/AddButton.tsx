import React from 'react';

export const AddButton: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center px-10 py-20 text-8xl whitespace-nowrap bg-orange-300 rounded-xl text-slate-800 max-md:px-5 max-md:text-4xl">
      <div className="overflow-hidden z-10 px-6 pt-0 pb-14 bg-white h-[90px] rounded-[200px] w-[90px] max-md:pr-5 max-md:text-4xl">
        +
      </div>
    </div>
  );
};
