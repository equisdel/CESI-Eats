import React from "react";

interface FoodCardProps {
  imageUrl: string;
  title: string;
  subtitle?: string; // ✅ ajouté pour afficher le prix
  hasWhiteBackground?: boolean;
  onViewElement: () => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  imageUrl,
  title,
  subtitle,
  hasWhiteBackground = false,
  onViewElement,
}) => {
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
        <div className="text-center mt-2">
          <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
          {subtitle && (
            <p className="text-sm text-slate-500">{subtitle}</p>
          )}
        </div>
        <div className="flex justify-end mt-2">
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
