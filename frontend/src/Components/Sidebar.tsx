import React from 'react';
import { useNavigate } from 'react-router-dom';


export const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="px-7 pt-6 pb-96 mx-auto w-full bg-slate-800 max-md:px-5 max-md:pb-24 max-md:mt-3">

      {/* Top icons */}
      <div className="flex gap-5 justify-between">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/dc2319f83b3a42a8a7d7e21e5b5256f0/f8d92a3a13dc706baeea706cba270e0bed635c30?placeholderIfAbsent=true"
          alt="Home"
          onClick={() => navigate('/restaurant-home')}
          className="object-contain shrink-0 rounded-none aspect-square w-[60px] cursor-pointer hover:scale-105 transition duration-200"
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/dc2319f83b3a42a8a7d7e21e5b5256f0/08e194d7e38249019209897e14a58256a588266f?placeholderIfAbsent=true"
          alt="Navigation icon 2"
          onClick={() => navigate('/user-home')}
          className="object-contain shrink-0 rounded-none aspect-square w-[60px]"
        />
      </div>

      <div
        className="p-3 mt-12 text-base font-bold whitespace-nowrap bg-orange-300 rounded-xl text-slate-800 max-md:pr-5 max-md:mt-10 cursor-pointer hover:bg-orange-400 transition duration-200 ease-in-out"
        onClick={() => navigate('/restaurant-orders')}
      >
        ORDERS
      </div>

      <div
        className="p-3 mt-4 text-base font-bold whitespace-nowrap bg-orange-300 rounded-xl text-slate-800 max-md:pr-5 cursor-pointer hover:bg-orange-400 transition duration-200 ease-in-out"
        onClick={() => navigate('/menus')}
      >
        MENUS
      </div>

      <div
        className="p-3 mt-3 text-base font-bold whitespace-nowrap bg-yellow-400 rounded-xl text-slate-800 max-md:pr-5 cursor-pointer hover:bg-yellow-300 transition duration-200 ease-in-out"
        onClick={() => navigate('/analytics')}
      >
        STATISTICS
      </div>

      <div
        className="p-3 mt-4 text-base font-bold whitespace-nowrap bg-yellow-400 rounded-xl text-slate-800 max-md:pr-5 cursor-pointer hover:bg-yellow-300 transition duration-200 ease-in-out"
        onClick={() => navigate('/referrals')}
      >
        REFERRALS
      </div>

      <div
        className="px-14 py-3 mt-12 text-base font-bold whitespace-nowrap bg-yellow-400 rounded-xl text-slate-800 max-md:px-5 max-md:mt-10 cursor-pointer hover:bg-yellow-300 transition duration-200 ease-in-out"
        onClick={() => navigate('/profile')}
      >
        PROFILE
      </div>

      <div className="flex gap-3 mt-3 text-xs font-bold text-slate-800">
        <div
          className="px-3 py-3.5 whitespace-nowrap rounded-xl bg-zinc-400 cursor-pointer hover:bg-zinc-300 transition duration-200 ease-in-out"
          onClick={() => navigate('/settings')}
        >
          SETTINGS
        </div>
        <div
          className="px-4 py-3.5 bg-red-400 rounded-xl cursor-pointer hover:bg-red-500 transition duration-200 ease-in-out"
          onClick={() => console.log('Logging out...')}
        >
          LOG OUT
        </div>
      </div>
    </nav>
  );
};