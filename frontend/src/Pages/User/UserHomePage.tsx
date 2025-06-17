import React, { useState } from 'react';
import { UserHeader  } from '../../Components/UserHeader.tsx';
import { Sidebar } from '../../Components/UserSidebar.tsx';
import  {MainContent} from './MainContent.tsx';
import { CartModal } from '../../Components/CartModal.tsx'; // si déjà créé

export const UserHomePage: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
const handleMarkAsPaid = (id: string) => {
  setCartItems(prev =>
    prev.map(item => item.id === id ? { ...item, paid: true } : item)
  );
};
  const handleAddToCart = (menu: any) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === menu.menu_id);
      if (existing) {
        return prev.map((item) =>
          item.id === menu.menu_id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: menu.menu_id,
          title: `Menu #${menu.menu_id}`,
          price: menu.price,
          quantity: 1,
          imageUrl: `http://localhost:8000/images/${menu.photo}`,
          paid: false,
        },
      ];
    });
  };
const handleQuantityChange = (id: string, amount: number) => {
  setCartItems((prev) =>
    prev.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    )
  );
};

const handleRemoveItem = (id: string) => {
  setCartItems((prev) => prev.filter(item => item.id !== id));
};
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

          {/* On passe handleAddToCart à MainContent */}
          <MainContent onAddToCart={handleAddToCart} />
        </div>
      </div>

      {/* Affiche le panier si ouvert */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
         onQuantityChange={handleQuantityChange}
  onRemove={handleRemoveItem}
    onMarkAsPaid={handleMarkAsPaid} // ✅ ici c’est correct

      />
    </div>
    
  );
};

export default UserHomePage;
