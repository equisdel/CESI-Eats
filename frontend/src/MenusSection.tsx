import React from 'react';
import { AddButton } from './AddButton.tsx';
import { MenuCard } from './MenuCard.tsx';

export const MenusSection: React.FC = () => {
  return (
    <section className="flex flex-col items-start pl-11 w-full max-md:pl-5 max-md:max-w-full">
      <h2 className="mt-10 ml-12 text-4xl font-bold text-slate-800 max-md:ml-2.5">
        MENUS
      </h2>

      <div className="flex flex-wrap gap-5 justify-between w-full max-w-[1052px] max-md:max-w-full">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/dc2319f83b3a42a8a7d7e21e5b5256f0/7987a946780278ddb7cf7d65446081dfc0759109?placeholderIfAbsent=true"
          alt="Menu icon"
          className="object-contain shrink-0 my-auto aspect-square w-[30px]"
        />

        <AddButton />

        <div className="flex gap-3.5">
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <div className="flex shrink-0 rounded-xl bg-zinc-400 h-[250px] w-[90px]" />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/dc2319f83b3a42a8a7d7e21e5b5256f0/a7e52e1206801815d77a900ee97ac0872c6fd934?placeholderIfAbsent=true"
            alt="Navigation icon"
            className="object-contain shrink-0 my-auto aspect-square w-[30px]"
          />
        </div>
      </div>
    </section>
  );
};
