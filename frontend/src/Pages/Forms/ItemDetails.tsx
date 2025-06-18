import React from 'react';

interface ItemDetailsProps {
  name: string;
  price: string;
  onNameChange: (name: string) => void;
  onPriceChange: (price: string) => void;
}

export const ItemDetails: React.FC<ItemDetailsProps> = ({
  name,
  price,
  onNameChange,
  onPriceChange
}) => {
  return (
    <section className="flex flex-col self-start gap-2 mt-0 mb-6">
      <div className="flex flex-col gap-0 mt-0 mb-2">
        <label className="text-base leading-10 text-slate-800 font-bold min-w-[60px]">
          NAME
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="px-3 py-0.5 bg-pink-100 rounded-xl text-base leading-10 text-slate-800 border-none outline-none w-[220px] h-8"
          placeholder="Beef Empanada"
        />
      </div>
      <div className="flex items-center gap-2 mb-2">
        <label className="text-base leading-10 text-slate-800 font-bold min-w-[60px]">
          PRICE
        </label>
        <input
          type="text"
          value={price}
          onChange={(e) => onPriceChange(e.target.value)}
          className="bg-pink-100 rounded-xl w-[120px] px-3 py-0.5 border-none outline-none text-slate-800 h-8"
          placeholder="Enter price"
        />
      </div>
    </section>
  );
};