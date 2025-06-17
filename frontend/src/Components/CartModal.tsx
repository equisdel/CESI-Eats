"use client";
import React from "react";

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
  paid: boolean;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onQuantityChange: (id: string, amount: number) => void;
  onRemove: (id: string) => void;
  onMarkAsPaid: (id: string) => void; // ✅ Déclaration correcte

}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  items,
  onQuantityChange,
  onRemove,
  onMarkAsPaid // ✅ ici maintenant c’est bon

}) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-4xl p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl">
          ✖
        </button>

        <h2 className="text-2xl font-bold mb-6">🛒 Shopping Cart</h2>

        <div className="flex gap-4">
          {/* LEFT SIDE : Cart Items */}
          <div className="w-2/3 space-y-4 overflow-y-auto max-h-[60vh]">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                <img src={item.imageUrl} alt={item.title} className="w-20 h-20 object-cover rounded" />
                <div className="flex flex-col flex-grow">
                  <span className="font-semibold">{item.title}</span>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => onQuantityChange(item.id, -1)}
                      className="px-2 py-1 bg-gray-200 rounded-l"
                    >
                      −
                    </button>
                    <span className="px-3 py-1 border-t border-b">{item.quantity}</span>
                    <button
                      onClick={() => onQuantityChange(item.id, +1)}
                      className="px-2 py-1 bg-gray-200 rounded-r"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="font-bold text-sm">€{(item.price * item.quantity).toFixed(2)}</span>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
            <button
  className={`w-full py-2 rounded ${items.some(i => !i.paid) ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800 text-white'}`}
  disabled={items.some(i => !i.paid)}
>
  Confirm
</button>
          </div>

          {/* RIGHT SIDE : Summary */}
          <div className="w-1/3 bg-gray-100 p-4 rounded">
            <h3 className="text-xl font-semibold mb-4">Summary</h3>
            <p className="flex justify-between mb-2">
              <span>Items</span>
              <span>{items.reduce((acc, item) => acc + item.quantity, 0)}</span>
            </p>
            <p className="flex justify-between mb-2">
              <span>Total</span>
              <span className="font-bold">€{total.toFixed(2)}</span>
            </p>
            <button
  onClick={() => items.forEach(item => {
    if (!item.paid) onMarkAsPaid(item.id); // ✅ marquer chaque item non payé
  })}
  className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
>
  Pay
</button>
          </div>
          
        </div>
      </div>
    </div>
  );
};
