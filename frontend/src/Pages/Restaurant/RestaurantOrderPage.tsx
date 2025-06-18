import React from 'react';
import { RestaurantHeader } from '../../Components/RestaurantHeader.tsx';
import { Sidebar } from '../../Components/Sidebar.tsx';
import { MainContent } from './MainContentOrder.tsx';


export const RestaurantOrdersPage: React.FC = () => {
  return (
    
    <div className="overflow-hidden bg-orange-50">
          <RestaurantHeader />
    
          <div className="w-full max-w-[1417px] max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:">
              <div className="w-[17%] max-md:ml-0 max-md:w-full">
                <Sidebar />
              </div>
    
              <MainContent /> 
               
    
            </div>
          </div>
        </div>
  );
};

export default RestaurantOrdersPage;
