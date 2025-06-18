import React from 'react';

interface QuickActionButtonProps {
  icon: string;
  text: string;
  iconAlt?: string;
}

export const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  icon,
  text,
  iconAlt = "Action icon"
}) => {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col justify-center items-center px-2 bg-yellow-400 rounded-xl h-[38px] w-[38px]">
        <img
          src={icon}
          alt={iconAlt}
          className="object-contain aspect-square w-[25px]"
        />
      </div>
      <div className="grow shrink my-auto text-xl font-bold text-slate-800">
        {text}
      </div>
    </div>
  );
};
