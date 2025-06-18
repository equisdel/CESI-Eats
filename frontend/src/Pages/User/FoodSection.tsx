"use client";
import * as React from "react";

interface FoodCardProps {
  imageUrl: string;
  title: string;
  hasWhiteBackground?: boolean;
  onAddToCart: () => void;
}

interface FoodSectionProps {
  title: string;
  showMostPopular?: boolean;
  menus: any[];
  onAddToCart: (menu: any) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  imageUrl,
  title,
  hasWhiteBackground = false,
  onAddToCart,
}) => {
  const handleAddToCart = () => {
    onAddToCart();
  };

  const handleViewDetails = () => alert(`Viewing details for ${title}`);

  return (
    <article className="pb-2.5 text-xl font-bold leading-10 rounded-xl bg-zinc-400 text-slate-800 min-w-[200px]">
      <div className={`overflow-hidden rounded-xl ${hasWhiteBackground ? "bg-white" : ""}`}>
        <img
          src={imageUrl}
          alt={title}
          className="object-cover aspect-[1.2] w-[200px] h-[150px]"
        />
      </div>

      <div className="flex flex-col px-3 mt-0">
        <h3 className="self-start">{title}</h3>
        <div className="flex justify-between mt-2">
          <button
            onClick={handleAddToCart}
            className="text-sm font-semibold bg-blue-600 text-white rounded-md px-2 py-1 hover:bg-blue-700"
          >
            + Add to Cart
          </button>
          <button onClick={handleViewDetails} aria-label="View">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/dc2319f83b3a42a8a7d7e21e5b5256f0/31b948f52339ca9bf68fafcc54211607cc7beb02?placeholderIfAbsent=true"
              className="object-contain w-[25px]"
              alt="View"
            />
          </button>
        </div>
      </div>
    </article>
  );
};

export const FoodSection: React.FC<FoodSectionProps> = ({
  title,
  showMostPopular = false,
  menus,
  onAddToCart,
}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -700, behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 700, behavior: "smooth" });

  const baseUrl = window.location.origin.includes("localhost")
    ? "http://localhost:8000"
    : window.location.origin;
    

  return (
    <section className="mt-10 max-md:mt-10">
      <h2 className="ml-12 text-4xl font-bold text-slate-800 max-md:ml-2.5 mb-4">{title}</h2>
      <div className="flex items-center gap-2 px-6">
        <button onClick={scrollLeft}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/dc2319f83b3a42a8a7d7e21e5b5256f0/7987a946780278ddb7cf7d65446081dfc0759109?placeholderIfAbsent=true"
            className="w-[30px] h-[30px] cursor-pointer"
            alt="Scroll Left"
          />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide"
          style={{ maxWidth: "1280px", scrollBehavior: "smooth", scrollbarWidth: "none" }}
        >
          {menus.map((menu, i) => (
            <div key={menu.menu_id} className="shrink-0">
              <FoodCard
                title={menu.Restaurant?.name || "Menu"}
                imageUrl={`${baseUrl}/api/menus/images/${menu.photo}`} // ✅ via Gateway
                hasWhiteBackground={i % 2 === 0}
                onAddToCart={() => onAddToCart(menu)}
              />
            </div>
          ))}
        </div>

        <button onClick={scrollRight}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/dc2319f83b3a42a8a7d7e21e5b5256f0/a7e52e1206801815d77a900ee97ac0872c6fd934?placeholderIfAbsent=true"
            className="w-[30px] h-[30px] cursor-pointer"
            alt="Scroll Right"
          />
        </button>
      </div>
    </section>
  );
};
