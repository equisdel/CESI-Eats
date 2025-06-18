"use client";
import * as React from "react";
import { QuickActions } from "./QuickActions.tsx";
import { FoodSection } from "./FoodSection.tsx";
import { useEffect, useState } from "react";

interface MainContentProps {
  onAddToCart: (menu: any) => void;
}

export const MainContent: React.FC<MainContentProps> = ({ onAddToCart }) => {
  const [popularMenus, setPopularMenus] = useState([]);

  useEffect(() => {
    fetchPopularMenus().then(setPopularMenus);
  }, []);

  return (
    <main className="mt-2 w-full max-md:mt-5 max-md:max-w-full">
      <div className="w-full max-w-[1091px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="w-[76%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow text-xl text-zinc-400 max-md:mt-5 max-md:max-w-full">
              <nav className="self-start">CESI-Eats &gt; Home</nav>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/dc2319f83b3a42a8a7d7e21e5b5256f0/ccf64bf996ed11532c81d23530880ecaaa7b6663?placeholderIfAbsent=true"
                className="object-contain self-end mt-6 max-w-full rounded-xl aspect-[4.69] w-[726px]"
                alt="Hero banner"
              />
            </div>
          </div>

          <div className="ml-5 w-[24%] max-md:ml-0 max-md:w-full">
            <QuickActions />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start pl-11 w-full max-md:pl-5 max-md:max-w-full">
        <FoodSection
          title="MOST POPULAR"
          showMostPopular={true}
          menus={popularMenus}
          onAddToCart={onAddToCart}
        />
        <FoodSection
          title="Nombre de restaurante"
          showMostPopular={true}
          menus={popularMenus}
          onAddToCart={onAddToCart}
        />
      </div>
    </main>
  );
};

const fetchPopularMenus = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/menu/menu/");
    //const response = await fetch("http://localhost:5004/menu/");
    console.log(response)
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Erreur lors du fetch des menus :", err);
    return [];
  }
};
