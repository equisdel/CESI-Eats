import React from "react";

interface FoodCardProps {
  imageUrl: string;
  title: string;
  hasWhiteBackground?: boolean;
  onViewElement: () => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  imageUrl,
  title,
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
        <h3 className="self-start">{title}</h3>
        <div className="flex justify-between mt-2">
          <button
            onClick={onViewElement}
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