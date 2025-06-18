"use client";
import React, { useState } from "react";
import axios from "axios";
import PaymentForm from "./PaymentCard.tsx"; // Assure-toi que le chemin est correct

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
  onMarkAsPaid: (id: string) => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  items,
  onQuantityChange,
  onRemove,
  onMarkAsPaid,
}) => {
  const [deliveryAddress, setDeliveryAddress] = useState({
    address: "",
    postalCode: "",
    city: "",
  });

  const [errors, setErrors] = useState({
    address: "",
    postalCode: "",
    city: "",
  });

  const [showPayment, setShowPayment] = useState(false);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const allPaid = items.every((item) => item.paid);

  const validateFields = () => {
    let isValid = true;
    const newErrors = { address: "", postalCode: "", city: "" };

    if (!deliveryAddress.address.trim()) {
      newErrors.address = "L’adresse est obligatoire.";
      isValid = false;
    }

    if (!/^\d{5}$/.test(deliveryAddress.postalCode)) {
      newErrors.postalCode = "Le code postal doit contenir 5 chiffres.";
      isValid = false;
    }

    if (!deliveryAddress.city.trim()) {
      newErrors.city = "La ville est obligatoire.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleConfirm = async () => {
    if (!validateFields()) return;

    const baseUrl = window.location.origin.includes("localhost")
      ? "http://localhost:8000"
      : window.location.origin;

    try {
      const response = await axios.post(`${baseUrl}/api/orders`, {
        client_id: "00000000-0000-0000-0000-000000000001",
        delivery_address: `${deliveryAddress.address}, ${deliveryAddress.postalCode} ${deliveryAddress.city}`,
        total_price: total,
        menus: items.map((item) => item.id),
      });

      alert(`Commande confirmée ! ID: ${response.data.order_id}`);
      onClose();
    } catch (error) {
      console.error("Erreur lors de la confirmation de la commande :", error);
      alert("Erreur lors de l'envoi de la commande.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-4xl p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl">
          ✖
        </button>

        {showPayment ? (
          <PaymentForm
            total={total}
            onPaid={() => {
              items.forEach((item) => {
                if (!item.paid) onMarkAsPaid(item.id);
              });
              setShowPayment(false);
            }}
            onBack={() => setShowPayment(false)}
          />
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6">🛒 Shopping Cart</h2>
            <div className="flex gap-4">
              <div className="w-2/3 space-y-4 overflow-y-auto max-h-[60vh]">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 border-b pb-4">
<img
  src={`${item.imageUrl}`}
  alt={item.title}
  className="w-20 h-20 object-cover rounded"
/>

                    <div className="flex flex-col flex-grow">
                      <span className="font-semibold">{item.title}</span>
                      <div className="flex items-center mt-2">
                        <button onClick={() => onQuantityChange(item.id, -1)} className="px-2 py-1 bg-gray-200 rounded-l">−</button>
                        <span className="px-3 py-1 border-t border-b">{item.quantity}</span>
                        <button onClick={() => onQuantityChange(item.id, +1)} className="px-2 py-1 bg-gray-200 rounded-r">+</button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="font-bold text-sm">€{(item.price * item.quantity).toFixed(2)}</span>
                      <button onClick={() => onRemove(item.id)} className="text-sm text-red-600 hover:underline">Supprimer</button>
                    </div>
                  </div>
                ))}

                <div className="mt-4 p-4 bg-gray-100 rounded-md">
                  <h3 className="text-lg font-semibold mb-2">Adresse de livraison</h3>

                  <input type="text" placeholder="Adresse" value={deliveryAddress.address} onChange={(e) => setDeliveryAddress({ ...deliveryAddress, address: e.target.value })} className="w-full mb-1 p-2 border rounded" />
                  {errors.address && <p className="text-red-500 text-sm mb-2">{errors.address}</p>}

                  <input type="text" placeholder="Code postal" value={deliveryAddress.postalCode} onChange={(e) => setDeliveryAddress({ ...deliveryAddress, postalCode: e.target.value })} className="w-full mb-1 p-2 border rounded" />
                  {errors.postalCode && <p className="text-red-500 text-sm mb-2">{errors.postalCode}</p>}

                  <input type="text" placeholder="Ville" value={deliveryAddress.city} onChange={(e) => setDeliveryAddress({ ...deliveryAddress, city: e.target.value })} className="w-full mb-1 p-2 border rounded" />
                  {errors.city && <p className="text-red-500 text-sm mb-2">{errors.city}</p>}
                </div>

                <button
                  onClick={handleConfirm}
                  className={`w-full py-2 mt-2 rounded ${!allPaid ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800 text-white'}`}
                  disabled={!allPaid}
                >
                  Confirmer la commande
                </button>
              </div>

              <div className="w-1/3 bg-gray-100 p-4 rounded">
                <h3 className="text-xl font-semibold mb-4">Summary</h3>
                <p className="flex justify-between mb-2"><span>Items</span><span>{items.reduce((acc, item) => acc + item.quantity, 0)}</span></p>
                <p className="flex justify-between mb-2"><span>Total</span><span className="font-bold">€{total.toFixed(2)}</span></p>
                <button
                  onClick={() => setShowPayment(true)}
                  className={`w-full py-2 rounded font-bold ${allPaid ? 'bg-green-600' : 'bg-black'} text-white`}
                >
                  {allPaid ? "Paid" : "Pay"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
