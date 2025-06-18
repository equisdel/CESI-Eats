import React, { useState } from "react";

interface UserHeaderProps {
  restaurantName?: string;
  onSearchClick?: () => void;
  onProfileClick?: () => void;
  onMenuClick?: () => void;

  // ✅ Nouvelle prop pour ouvrir le panier
  onCartClick?: () => void;
    cartCount?: number; // ✅ NOUVEAU

}

export const UserHeader: React.FC<UserHeaderProps> = ({
  restaurantName = "End-User's Name",
  onSearchClick,
  onProfileClick,
  onMenuClick,
  onCartClick, // ✅ Reçu ici
  cartCount = 0, // ✅ valeur par défaut

  
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  return (
    <header className="flex justify-between items-center px-6 py-3 w-full font-bold bg-[#ACA7AA] text-white relative">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src="../Images/CesiEatsLogo.png" alt="CESI Eats Logo" className="w-[100px] h-auto object-contain" />
      </div>

      {/* Search */}
      <div className="flex items-center w-[40%] max-w-[400px] bg-[#F7F0E8] text-gray-700 rounded-full px-4 py-2">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 bg-transparent outline-none placeholder:text-gray-500"
        />
        <button onClick={onSearchClick} aria-label="Search">🔍</button>
      </div>

      {/* Right side */}
      <div className="flex gap-3.5 items-center self-stretch my-auto text-xl text-orange-50">
        <span className="grow self-stretch my-auto">{restaurantName}</span>

        <button onClick={onProfileClick} aria-label="Profile">
          <img src="../Images/userIcon.png" alt="Profile" className="w-[60px] aspect-square object-contain" />
        </button>

        {/* Notification */}
        <div className="relative">
          <button onClick={toggleNotifications} aria-label="Toggle notifications">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/dc2319f83b3a42a8a7d7e21e5b5256f0/1da018d683531156775e9c38aa2586a0d93ce164?placeholderIfAbsent=true"
              alt="Notification bell"
              className="w-9 object-contain"
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

        {/* 🛒 Panier avec clic déclencheur */}
        <div className="relative">
          <button onClick={onCartClick} className="relative">
  <img src="../Images/panier.png" alt="Panier" className="w-9 cursor-pointer" />
  {cartCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
      {cartCount}
    </span>
  )}
</button>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};
