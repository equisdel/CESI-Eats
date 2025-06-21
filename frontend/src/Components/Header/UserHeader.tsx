import React, { useState, useEffect } from "react";
import logo from "../../assets/logo_cesi_eats.png";
import profile from "../../assets/userIcon.png";
import panier from "../../assets/panier.png"; // 🛒 ton icône panier
import { jwtDecode } from "jwt-decode";

interface UserHeaderProps {
  onSearchClick?: () => void;
  onProfileClick?: () => void;
  onMenuClick?: () => void;
  onCartClick?: () => void; // ✅ Nouvelle prop pour ouvrir le panier
  cartCount?: number; // ✅ NOUVEAU
}

export const UserHeader: React.FC<UserHeaderProps> = ({
  onSearchClick,
  onProfileClick,
  onMenuClick,
  onCartClick,
  cartCount = 0,
  email,
}) => {
  const [restaurantName, setRestaurantName] = useState("Loading...");

  useEffect(() => {
    const fetchRestaurantName = async () => {
      const token = localStorage.getItem("token");
      const decoded: any = jwtDecode(token);
      const emailUser = encodeURIComponent(decoded.email);
      try {
        const response = await fetch(
          `http://localhost:8000/api/users/name/${emailUser}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch the user name.");
        }

        const data = await response.json();
        setRestaurantName(data.name || "Unknown User"); 
      } catch (error) {
        console.error("Error fetching restaurant name:", error);
        setRestaurantName("Unknown User");
      }
    };

    fetchRestaurantName();
  }, [email]);

  return (
    <header className="flex justify-between items-center px-6 py-3 w-full font-bold bg-[#ACA7AA] text-white relative">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="CESI Eats Logo" className="w-[100px] h-auto object-contain" />
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

      {/* Right side */}
      <div className="flex gap-3.5 items-center self-stretch my-auto text-xl text-orange-50">
        <span className="grow self-stretch my-auto">{restaurantName}</span>

        <button onClick={onProfileClick} aria-label="Profile">
          <img src={profile} alt="Profile" className="w-[60px] aspect-square object-contain" />
        </button>

        {/* Notification */}
        <div className="relative">
          <button onClick={() => setShowNotifications((prev) => !prev)} aria-label="Toggle notifications">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/dc2319f83b3a42a8a7d7e21e5b5256f0/1da018d683531156775e9c38aa2586a0d93ce164?placeholderIfAbsent=true"
              alt="Notification bell"
              className="w-9 object-contain"
            />
          </button>
        </div>

        {/* 🛒 Panier avec clic déclencheur */}
        <div className="relative">
          <button onClick={onCartClick} className="relative">
            <img src={panier} alt="Panier" className="w-9 cursor-pointer" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};