import React, { useEffect, useState } from "react";
import { ItemImageUpload } from "./ItemImageUpload.tsx";
import { ItemDetails } from "./ItemDetails.tsx";
import { FormActions } from "./FormActions.tsx";

const port = 8000; // gateway

interface MenuFormData {
  menu_name: string;
  menu_price: string;
  menu_image: string;
  menu_description: string;
  items: string[]; 
}

interface Item {
  id: string;
  name: string;
}

export const AddMenuForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [formData, setFormData] = useState<MenuFormData>({
    menu_name: 'Menu Name',
    menu_price: '0.00',
    menu_description: 'Menu Description',
    items: [],
    menu_image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9d9175e660762d60e26e190295bc5906ded44485?placeholderIfAbsent=true&apiKey=098edc85fcc944caaa83d6d7b30f4a5b'
  });
  
  const [items, setItems] = useState<Item[]>([]);
  const [restaurantId, setRestaurantId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

// Fetch restaurant ID and then fetch items
  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        setLoading(true);
        
        // Try to get restaurant_id from localStorage first
        const userData = JSON.parse(localStorage.getItem("userData") || "{}");
        let restaurant_id = userData.restaurant_id;
        
        // If not in localStorage, fetch from API
        if (!restaurant_id) {
          const res = await fetch('http://localhost:${port}/api/getRestaurantId/:email');
          if (!res.ok) throw new Error("Failed to fetch restaurant ID");
          const data = await res.json();
          restaurant_id = data.restaurant_id;
        }
        
        setRestaurantId(restaurant_id);
        
        // Now fetch items for this restaurant
        const itemsRes = await fetch('http://localhost:${port}/api/menus/item/?restaurant_id=${restaurant_id}');
        if (itemsRes.ok) {
          const itemsData = await itemsRes.json();
          setItems(itemsData);
        } else {
          console.warn("Failed to fetch items");
          setItems([]);
        }
        
      } catch (err) {
        console.error("Error fetching restaurant data:", err);
        setError("Failed to load restaurant data");
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, []);

  const handleItemSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setFormData((prev) => ({ ...prev, items: selected }));
  };

  const handleCancel = () => {
    setFormData({
      menu_name: "",
      menu_price: "",
      menu_image: "",
      menu_description: "",
      items: [],
    });
    onClose();
  };

  const handleAdd = async () => {
    // Validation: ensure at least one item is selected
    if (formData.items.length === 0) {
      setError("Please select at least one item for the menu");
      return;
    }

    // Validation: ensure required fields are filled
    if (!formData.menu_name.trim() || formData.menu_name === 'Menu Name') {
      setError("Please enter a valid menu name");
      return;
    }

    if (!formData.menu_price || formData.menu_price === '0.00') {
      setError("Please enter a valid menu price");
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      const payload = { 
        ...formData, 
        restaurant_id: restaurantId 
      };
      
      const res = await fetch('http://localhost:${port}/api/menus', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error adding menu");
      }
      
      // Success - close the form
      onClose();
      
    } catch (err) {
      console.error("Error adding menu:", err);
      setError(err instanceof Error ? err.message : "Failed to add menu");
    } finally {
      setLoading(false);
    }
  };

  if (loading && items.length === 0) {
    return (
      <main className="font-bold rounded-none max-w-[471px]">
        <div className="flex flex-col px-10 py-5 w-full rounded-xl bg-zinc-400">
          <div className="self-center text-xl text-slate-800">Loading...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="font-bold rounded-none max-w-[471px]">
      <form className="flex flex-col px-10 py-5 w-full rounded-xl bg-zinc-400">
        <header className="self-center text-4xl leading-none text-slate-800 mb-7">
          ADD A NEW MENU
        </header>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <div className="flex z-10 gap-5 justify-between text-base leading-10 text-slate-800">
          <ItemImageUpload
            imageUrl={formData.menu_image}
            onImageChange={(url) => setFormData((prev) => ({ ...prev, menu_image: url }))}
          />
          <ItemDetails
            name={formData.menu_name}
            price={formData.menu_price}
            onNameChange={(name) => setFormData((prev) => ({ ...prev, menu_name: name }))}
            onPriceChange={(price) => setFormData((prev) => ({ ...prev, menu_price: price }))}
          />
        </div>
        
        <div className="flex flex-col mt-4 mb-2">
          <label className="text-base leading-10 text-slate-800 font-bold mb-1">
            DESCRIPTION
          </label>
          <textarea
            value={formData.menu_description || ""}
            onChange={e => setFormData(prev => ({ ...prev, menu_description: e.target.value }))}
            className="rounded-xl bg-pink-100 px-3 py-1 text-base text-slate-800 resize-none"
            rows={3}
            placeholder="Describe your menu"
          />
        </div>
        
        <div className="flex flex-col mt-4 mb-6">
          <label className="text-base leading-10 text-slate-800 font-bold mb-1">
            ITEMS *
          </label>
          <select
            multiple
            value={formData.items || []}
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
          {items.length === 0 && !loading && (
            <p className="text-sm text-red-600 mt-1">
              No items available. Please add items first before creating a menu.
            </p>
          )}
        </div>
        
        <FormActions 
          onCancel={handleCancel} 
          onAdd={handleAdd}
          //disabled={loading || items.length === 0}
        />
      </form>
    </main>
  );
};

export default AddMenuForm;


//
/*
export const AddMenuForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  
  const [fetchItemsPath, setFetchItemsPath] = useState("");
  useEffect(() => {
    const fetchRestaurantId = async () => {
      try {
        const res = await fetch(http://localhost:${port}/api/getRestaurantId/:email); //consigue el id del restaurante
        const data = await res.json();
        setFetchItemsPath(http://localhost:${port}/api/menus/item/?restaurant_id=${data.restaurant_id});  // fetches all items from that restaurant
      } catch (err) {
        console.error("Error fetching restaurant ID:", err);
      }
    };
    fetchRestaurantId();
  }, []);

  const [formData, setFormData] = useState<MenuFormData>({
    menu_name: 'Menu Name',
    menu_price: '0.00',
    menu_description: 'Menu Description',
    items: [''],
    menu_image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9d9175e660762d60e26e190295bc5906ded44485?placeholderIfAbsent=true&apiKey=098edc85fcc944caaa83d6d7b30f4a5b'
  });
  const [items, setItems] = useState<Item[]>([]);

  // Fetch items for this restaurant
  useEffect(() => {
    fetch(fetchItemsPath) //1. modify gateway to change <> for the restaurant id that should be in the token's payload
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
      menu_name: "",
      menu_price: "",
      menu_image: "",
      menu_description: "",
      items: [],
    });
    onClose();
  };

  const handleAdd = async () => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const restaurant_id = userData.restaurant_id;
    const payload = { ...formData, restaurant_id };
    try {
      const res = await fetch(postMenuPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Error adding menu");
    
    } catch (err) {
 
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
            imageUrl={formData.menu_image}
            onImageChange={(url) => setFormData((prev) => ({ ...prev, imageUrl: url }))}
          />
          <ItemDetails
            name={formData.menu_name}
            price={formData.menu_price}
            onNameChange={(name) => setFormData((prev) => ({ ...prev, name }))}
            onPriceChange={(price) => setFormData((prev) => ({ ...prev, price }))}
          />
        </div>
        <div className="flex flex-col mt-4 mb-2">
        <label className="text-base leading-10 text-slate-800 font-bold mb-1">
            DESCRIPTION
        </label>
        <textarea
            value={formData.menu_description || ""}
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
            value={formData.items || []}
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

export default AddMenuForm;
*/