"use client";
import * as React from "react";
import { FoodCard } from "./FoodCard.tsx";

interface FoodSectionProps {
  title: string;
  showAll?: boolean;
  elements: any[];
  onViewElement: (element: any) => void;
  onAddElement: () => void;
}

// AddElementCard component
const AddElementCard: React.FC<{ onAdd: () => void }> = ({ onAdd }) => (
  <article
    className="flex flex-col items-center justify-center pb-2.5 text-xl font-bold leading-10 rounded-xl bg-pink-100 text-slate-800 min-w-[200px] h-[220px] border-2 border-dashed border-pink-300 cursor-pointer hover:bg-pink-200 transition-colors"
    style={{ width: "200px" }}
    onClick={onAdd}
  >
    <span className="text-5xl text-pink-400 mb-2">+</span>
    <span className="text-lg font-bold text-slate-800">Add Element</span>
  </article>
);

export const FoodSection: React.FC<FoodSectionProps> = ({
  title,
  showAll = false,
  elements,
  onViewElement,
  onAddElement, // <-- receive the prop
}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -700, behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 700, behavior: "smooth" });

  // 🔁 Dynamique : si on est sur un port autre que 80, utilise http://localhost:8000
  const isDev = window.location.port !== "80";
  const baseUrl = isDev ? "http://localhost:8000" : "";

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
          {/* Add Element Card as the first card */}
          <AddElementCard onAdd={onAddElement} />

          {/* Existing element cards */}
          {elements.map((element, i) => (
            <div key={element.id} className="shrink-0">
              <FoodCard
                title={element.Restaurant?.name || 'Element'}
                imageUrl={`http://localhost/images/${element.photo}`}
                hasWhiteBackground={i % 2 === 0}
                onViewElement={() => onViewElement(element)}
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
