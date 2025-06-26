import React, { useState } from "react";
import { UserHeader } from "../../Components/Header/UserHeader.tsx";
import { Sidebar } from "../../Components/Side bar/UserSidebar.tsx";
import { MainContent } from "./MainContent.tsx";
import { CartModal } from "../../Components/CartModal.tsx"; // Si déjà créé

export const UserHomePage: React.FC = () => {
  // ---------------- State ----------------
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // ---------------- Handlers ----------------
  // Ajouter un menu au panier
  const handleAddToCart = (menu: any) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === menu.menu_id);
      if (existing) {
        return prev.map((item) =>
          item.id === menu.menu_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: menu.menu_id,
          title: menu.menu_name, // Ajout du nom du menu`,
          price: menu.menu_price,
          quantity: 1,
          imageUrl: `http://localhost:8000/api/menus/images/${menu.menu_photo}`,
          paid: false,
           restaurant_id: menu.restaurant_id,
        },
      ];
    });
  };

  // Modifier la quantité d'un item dans le panier
  const handleQuantityChange = (id: string, amount: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  // Supprimer un item du panier
  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Marquer un item comme payé
  const handleMarkAsPaid = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, paid: true } : item
      )
    );
  };

  // ---------------- Render ----------------
  return (
    <div className="overflow-hidden bg-orange-50">
      <UserHeader
        onCartClick={() => setIsCartOpen(true)}
        cartCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
      />

      <div className="w-full max-w-[1417px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="w-[17%] max-md:ml-0 max-md:w-full">
            <Sidebar />
          </div>

          <MainContent onAddToCart={handleAddToCart} />
        </div>
      </div>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onQuantityChange={handleQuantityChange}
        onRemove={handleRemoveItem}
        onMarkAsPaid={handleMarkAsPaid}
      />
    </div>
  );
};

export default UserHomePage;