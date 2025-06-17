import React, { useState } from "react";
import logo from '../assets/logo_cesi_eats.png';
interface RestaurantHeaderProps {
  restaurantName?: string;
  onSearchClick?: () => void;
  onProfileClick?: () => void;
  onMenuClick?: () => void;
}

export const RestaurantHeader: React.FC<RestaurantHeaderProps> = ({
  restaurantName = "End-User's Name",
  onSearchClick,
  onProfileClick,
  onMenuClick,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  return (
    <header className="flex justify-between items-center px-6 py-3 w-full font-bold bg-[#ACA7AA] text-white relative">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img
          src={logo}
          alt="CESI Eats Logo"
          className="w-[100px] h-auto object-contain"
        />
      </div>

      {/* Search */}
      <div className="flex items-center w-[40%] max-w-[400px] bg-[#F7F0E8] text-gray-700 rounded-full px-4 py-2">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 bg-transparent outline-none placeholder:text-gray-500"
        />
        <button onClick={onSearchClick} aria-label="Search">
          🔍
        </button>
      </div>

      {/* Right side (Name + profile + notifications) */}
      <div className="flex gap-3.5 items-center self-stretch my-auto text-xl text-orange-50">
        <span className="grow self-stretch my-auto">{restaurantName}</span>
   
        <button onClick={onProfileClick} aria-label="Profile">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/dc2319f83b3a42a8a7d7e21e5b5256f0/89620081bfef887a9fa10e90f4d68cbbaf1bf3f8?placeholderIfAbsent=true"
            alt="Profile"
            className="object-contain shrink-0 self-stretch rounded-none aspect-square w-[60px]"
          />
        </button>

        <div className="relative">
          <button onClick={toggleNotifications} aria-label="Toggle notifications">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/dc2319f83b3a42a8a7d7e21e5b5256f0/1da018d683531156775e9c38aa2586a0d93ce164?placeholderIfAbsent=true"
              alt="Notification bell"
               className="object-contain shrink-0 self-stretch my-auto w-9 aspect-[0.9]"
            />
          </button>

          {showNotifications && (
  <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded shadow-lg p-4 z-50">
    <h4 className="text-sm font-semibold mb-2">Notifications</h4>
    <ul className="space-y-2 text-sm">
      <li className="flex items-start gap-2">
        <span className="text-yellow-500">⚠️</span>
        <span>Une nouvelle commande a été passée.</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="text-green-600">✅</span>
        <span>Commande #4563 livrée avec succès.</span>
      </li>
    </ul>
  </div>
)}

        </div>
      </div>
    </header>
  );
};
