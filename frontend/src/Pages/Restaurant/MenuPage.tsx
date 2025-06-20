import React from 'react';
import { RestaurantHeader } from '../../Components/RestaurantHeader.tsx';
import { Sidebar } from '../../Components/Sidebar.tsx';
import { MainContent } from './MainContentHome.tsx';

export const RestaurantHomePage: React.FC = () => {
  return (
    <div className="overflow-hidden bg-orange-50">
      <RestaurantHeader />

      <div className="w-full max-w-[1417px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:">
          <div className="w-[17%] max-md:ml-0 max-md:w-full">
            <Sidebar />
          </div>

         
          {/* <MainContent /> */}
          <div> <h1> Menu Page pour restaurant</h1></div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHomePage;
