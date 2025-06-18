import React from 'react';
import { OrderStatusCards } from './OrderStatusCards.tsx';
import { QuickActions } from './QuickActions.tsx';
import { ItemsSection } from './ItemsSection.tsx';
import { MenusSection } from './MenusSection.tsx';

export const MainContent: React.FC = () => {
  return (
    <main className="ml-5 w-[83%] max-md:ml-0 max-md:w-full">
      <div className="mt-2 w-full max-md:mt-5 max-md:max-w-full">
        <div className="w-full max-w-[1052px] max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:">
            <div className="w-[79%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow max-md:mt-5 max-md:max-w-full">
                <nav className="self-start text-xl text-zinc-400">
                  CESI-Eats &gt; Home{" "}
                </nav>

                <div className="flex flex-col items-start pl-20 mt-5 w-full max-md:pl-5 max-md:max-w-full">
                  <OrderStatusCards />
                  <h2 className="mt-11 text-4xl font-bold text-slate-800 max-md:mt-10">
                    ITEMS
                  </h2>
                </div>
              </div>
            </div>

            <div className="ml-5 w-[21%] max-md:ml-0 max-md:w-full">
              <QuickActions />
            </div>
          </div>
        </div>

        <ItemsSection />
        <MenusSection />
      </div>
    </main>
  );
};
