import React from 'react';
import { AddButton } from './AddButton.tsx';

export const ItemsSection: React.FC = () => {
  return (
    <section className="flex flex-col items-start pl-11 w-full max-md:pl-5 max-md:max-w-full">
      <div className="flex flex-wrap gap-5 justify-between items-start self-stretch w-full max-md:max-w-full">
        <div className="flex gap-4 self-start text-8xl whitespace-nowrap text-slate-800 max-md:max-w-full max-md:text-4xl">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/dc2319f83b3a42a8a7d7e21e5b5256f0/7987a946780278ddb7cf7d65446081dfc0759109?placeholderIfAbsent=true"
            alt="Items icon"
            className="object-contain shrink-0 my-auto aspect-square w-[30px]"
          />
          <AddButton />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/dc2319f83b3a42a8a7d7e21e5b5256f0/dcbc9c682d57d19808bf3fbae4c8d1523856a12c?placeholderIfAbsent=true"
            alt="Item preview"
            className="object-contain shrink-0 max-w-full rounded-xl aspect-[0.8] w-[201px]"
          />
        </div>

        <div className="flex flex-col self-end mt-28 text-xs font-bold text-white max-md:mt-10">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/dc2319f83b3a42a8a7d7e21e5b5256f0/a7e52e1206801815d77a900ee97ac0872c6fd934?placeholderIfAbsent=true"
            alt="Info icon"
            className="object-contain self-end mr-14 aspect-square w-[30px] max-md:mr-2.5"
          />
          
        </div>
      </div>
    </section>
  );
};
