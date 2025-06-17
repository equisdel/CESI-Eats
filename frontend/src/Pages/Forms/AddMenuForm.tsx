import React, { useEffect, useState } from "react";
import { ItemImageUpload } from "./ItemImageUpload.tsx";
import { ItemDetails } from "./ItemDetails.tsx";
import { FormActions } from "./FormActions.tsx";

interface MenuFormData {
  name: string;
  price: string;
  imageUrl: string;
  description: string;
  items: string[]; // IDs of selected items
}

interface Item {
  id: string;
  name: string;
}

export const AddMenuForm: React.FC = () => {
  const [formData, setFormData] = useState<MenuFormData>({
    name: "",
    price: "",
    imageUrl: "",
    description: "",
    items: [],
  });
  const [items, setItems] = useState<Item[]>([]);

  // Fetch items for this restaurant
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const restaurant_id = userData.restaurant_id;
    fetch(`http://localhost:8080/items?restaurant_id=${restaurant_id}`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch(() => setItems([]));
  }, []);

  const handleItemSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setFormData((prev) => ({ ...prev, items: selected }));
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      price: "",
      imageUrl: "",
      description: "",
      items: [],
    });
  };

  const handleAdd = async () => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const restaurant_id = userData.restaurant_id;
    const payload = { ...formData, restaurant_id };
    try {
      const res = await fetch("http://localhost:8080/menus/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Error adding menu");
      // Success logic here
    } catch (err) {
      // Error logic here
    }
  };

  return (
    <main className="font-bold rounded-none max-w-[471px]">
      <form className="flex flex-col px-10 py-5 w-full rounded-xl bg-zinc-400">
        <header className="self-center text-4xl leading-none text-slate-800 mb-7">
          ADD A NEW MENU
        </header>
        <div className="flex z-10 gap-5 justify-between text-base leading-10 text-slate-800">
          <ItemImageUpload
            imageUrl={formData.imageUrl}
            onImageChange={(url) => setFormData((prev) => ({ ...prev, imageUrl: url }))}
          />
          <ItemDetails
            name={formData.name}
            price={formData.price}
            onNameChange={(name) => setFormData((prev) => ({ ...prev, name }))}
            onPriceChange={(price) => setFormData((prev) => ({ ...prev, price }))}
          />
        </div>
        <div className="flex flex-col mt-4 mb-2">
        <label className="text-base leading-10 text-slate-800 font-bold mb-1">
            DESCRIPTION
        </label>
        <textarea
            value={formData.description || ""}
            onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="rounded-xl bg-pink-100 px-3 py-1 text-base text-slate-800 resize-none"
            rows={3}
            placeholder="Describe your menu"
        />
        </div>
        <div className="flex flex-col mt-4 mb-6">
          <label className="text-base leading-10 text-slate-800 font-bold mb-1">
            ITEMS
          </label>
          <select
            multiple
            value={formData.items}
            onChange={handleItemSelect}
            className="rounded-xl bg-pink-100 px-3 py-1 text-base text-slate-800"
            style={{ minHeight: "80px" }}
          >
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <FormActions onCancel={handleCancel} onAdd={handleAdd} />
      </form>
    </main>
  );
};

export default AddMenuForm;