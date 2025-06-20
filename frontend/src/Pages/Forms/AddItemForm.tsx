import React, { useState, useEffect } from 'react';
import { ItemImageUpload } from './ItemImageUpload.tsx';
import { ItemDetails } from './ItemDetails.tsx';
import { ItemIngredients } from './ItemIngredients.tsx';
import { FormActions } from './FormActions.tsx';

const port = 8000; // gateway

interface FormData {
  name: string;
  price: string;
  description: string;
  ingredients: string;
  imageUrl: string;
}

export const AddItemForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    price: '',
    description: '',
    ingredients: '',
    imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9d9175e660762d60e26e190295bc5906ded44485?placeholderIfAbsent=true&apiKey=098edc85fcc944caaa83d6d7b30f4a5b'
  });

  const [restaurantId, setRestaurantId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Fetch restaurant ID on component mount
  useEffect(() => {
    const fetchRestaurantId = async () => {
      try {
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
        
      } catch (err) {
        console.error("Error fetching restaurant ID:", err);
        setError("Failed to load restaurant data");
      }
    };

    fetchRestaurantId();
  }, []);

  const handleNameChange = (name: string) => {
    setFormData(prev => ({ ...prev, name }));
  };

  const handlePriceChange = (price: string) => {
    setFormData(prev => ({ ...prev, price }));
  };

  const handleDescriptionChange = (description: string) => {
    setFormData(prev => ({ ...prev, description }));
  };

  const handleIngredientsChange = (ingredients: string) => {
    setFormData(prev => ({ ...prev, ingredients }));
  };

  const handleImageChange = (imageUrl: string) => {
    setFormData(prev => ({ ...prev, imageUrl }));
  };

  const handleCancel = () => {
    // Reset form
    setFormData({
      name: '',
      price: '',
      description: '',
      ingredients: '',
      imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9d9175e660762d60e26e190295bc5906ded44485?placeholderIfAbsent=true&apiKey=098edc85fcc944caaa83d6d7b30f4a5b'
    });
    setError("");
    onClose();
  };

  const handleAdd = async () => {
    // Validation
    if (!formData.name.trim()) {
      setError("Please enter a valid item name");
      return;
    }

    if (!formData.price.trim()) {
      setError("Please enter a valid price");
      return;
    }

    if (!restaurantId) {
      setError("Restaurant ID not found. Please try refreshing the page.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Prepare the payload with restaurant_id in the body
      const payload = {
        name: formData.name,
        price: formData.price,
        description: formData.description,
        ingredients: formData.ingredients,
        imageUrl: formData.imageUrl,
        restaurant_id: restaurantId
      };

      console.log('Adding item:', payload);

      const response = await fetch('http://localhost:${port}/api/menus/item', {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error adding item");
      }

      const data = await response.json();
      console.log('Item added successfully:', data);
      
      // Success - close the form and reset only on success
      setFormData({
        name: '',
        price: '',
        description: '',
        ingredients: '',
        imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9d9175e660762d60e26e190295bc5906ded44485?placeholderIfAbsent=true&apiKey=098edc85fcc944caaa83d6d7b30f4a5b'
      });
      onClose();
      
    } catch (error) {
      console.error('Error adding item:', error);
      setError(error instanceof Error ? error.message : "Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="font-bold rounded-none max-w-[471px]">
      <form className="flex flex-col px-10 py-5 w-full rounded-xl bg-zinc-400">
        <header className="self-center text-4xl leading-none text-slate-800 mb-7">
          ADD A NEW ITEM
        </header>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="flex z-10 gap-5 justify-between text-base leading-10 text-slate-800">
          <ItemImageUpload
            imageUrl={formData.imageUrl}
            onImageChange={handleImageChange}
          />
          <ItemDetails
            name={formData.name}
            price={formData.price}
            onNameChange={handleNameChange}
            onPriceChange={handlePriceChange}
          />
        </div>

        <ItemIngredients
          description={formData.description}
          ingredients={formData.ingredients}
          onDescriptionChange={handleDescriptionChange}
          onIngredientsChange={handleIngredientsChange}
        />

        <FormActions
          onCancel={handleCancel}
          onAdd={handleAdd}
          //disabled={loading}
        />
        
        {loading && (
          <div className="text-center text-slate-800 mt-2">
            Adding item...
          </div>
        )}
      </form>
    </main>
  );
};

export default AddItemForm;