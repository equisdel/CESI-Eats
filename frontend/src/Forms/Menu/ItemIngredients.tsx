import React from 'react';

interface ItemIngredientsProps {
  description: string;
  ingredients: string;
  onDescriptionChange: (description: string) => void;
  onIngredientsChange: (ingredients: string) => void;
}

export const ItemIngredients: React.FC<ItemIngredientsProps> = ({
  description,
  ingredients,
  onDescriptionChange,
  onIngredientsChange
}) => {
  return (
    <section>
      <textarea
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        className="px-4 py-2.5 max-w-full text-xs leading-5 bg-orange-50 rounded-xl text-slate-800 w-[392px] border-none outline-none resize-none"
        placeholder="Savor our delicious Beef Empanada, featuring a golden, flaky pastry filled with seasoned ground beef, onions, and spices."
        rows={3}
      />
      <label className="block mt-3 text-base leading-10 text-slate-800 font-bold">
        INGREDIENTS
      </label>
      <textarea
        value={ingredients}
        onChange={(e) => onIngredientsChange(e.target.value)}
        className="px-3 py-1 text-xs leading-5 bg-orange-50 rounded-xl text-slate-800 w-full border-none outline-none resize-none"
        placeholder="Beef, onions, spices (cumin, paprika, oregano), hard-boiled eggs, olives."
        rows={2}
      />
    </section>
  );
};
