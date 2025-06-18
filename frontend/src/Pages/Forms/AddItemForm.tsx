import React, { useState } from 'react';
import { ItemImageUpload } from './ItemImageUpload.tsx';
import { ItemDetails } from './ItemDetails.tsx';
import { ItemIngredients } from './ItemIngredients.tsx';
import { FormActions } from './FormActions.tsx';

interface FormData {
  name: string;
  price: string;
  description: string;
  ingredients: string;
  imageUrl: string;
}



export const AddItemForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: 'Beef Empanada',
    price: '',
    description: 'Savor our delicious Beef Empanada, featuring a golden, flaky pastry filled with seasoned ground beef, onions, and spices.',
    ingredients: 'Beef, onions, spices (cumin, paprika, oregano), hard-boiled eggs, olives.',
    imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9d9175e660762d60e26e190295bc5906ded44485?placeholderIfAbsent=true&apiKey=098edc85fcc944caaa83d6d7b30f4a5b'
  });

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
    // Reset form or close modal
    setFormData({
      name: '',
      price: '',
      description: '',
      ingredients: '',
      imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9d9175e660762d60e26e190295bc5906ded44485?placeholderIfAbsent=true&apiKey=098edc85fcc944caaa83d6d7b30f4a5b'
    });
  };


  const handleAdd = async () => {
    localStorage.setItem('userData', JSON.stringify({ restaurant_id: 123 }));
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const restaurant_id = userData.restaurant_id; 

    const payload = {
      formData,
      restaurant_id,
    };

    console.log('Adding item:', formData);
      try {
        const response = await fetch('http://localhost:5004/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error('Error al agregar el item');
        }

        const data = await response.json();
        console.log('Item agregado:', data);
        // Aquí puedes limpiar el formulario o mostrar un mensaje de éxito
      } catch (error) {
        console.error('Error:', error);
        // Aquí puedes mostrar un mensaje de error al usuario
      }
  };

  return (
    <main className="font-bold rounded-none max-w-[471px]">
      <form className="flex flex-col px-10 py-5 w-full rounded-xl bg-zinc-400">
        <header className="self-center text-4xl leading-none text-slate-800 mb-7">
          ADD A NEW ITEM
        </header>

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
        />
      </form>
    </main>
  );
};

export default AddItemForm;