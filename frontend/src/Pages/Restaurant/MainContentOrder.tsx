import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

// ---------------- OrderCard ----------------
interface OrderCardProps {
  orderNumber: string;
  units: string;
  totalPrice: string;
  imageUrl: string;
  onAccept?: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
  orderNumber,
  units,
  totalPrice,
  imageUrl,
  onAccept,
}) => {
  return (
    <article className="relative h-[115px] w-[272px] rounded-xl bg-zinc-400 p-2 flex items-center">
      <img
        src={imageUrl}
        alt="Order Menu"
        className="w-[100px] h-[100px] rounded-md object-cover"
      />
      <div className="ml-3 flex flex-col justify-between h-full py-1">
        <div>
          <h3 className="text-base font-bold text-slate-800">
            Order : <span className="font-normal">{orderNumber}</span>
          </h3>
          <p className="text-slate-800 text-sm mt-1">
            Prix: <span className="font-bold">{totalPrice} €</span><br />
            UNITS: <span className="font-bold">{units}</span>
          </p>
        </div>
        {onAccept && (
          <div className="flex gap-2 mt-2">
            <button className="text-xs text-orange-50 bg-red-400 rounded-xl px-3 py-1 hover:bg-red-500 transition">REFUSE</button>
            <button
              className="text-xs text-orange-50 bg-lime-600 rounded-xl px-3 py-1 hover:bg-lime-700 transition"
              onClick={onAccept}
            >
              ACCEPT
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

// ---------------- OrderColumn ----------------
interface OrderColumnProps {
  orders: any[];
  onAccept?: (orderId: string) => void;
}

const OrderColumn: React.FC<OrderColumnProps> = ({ orders, onAccept }) => {
  const baseUrl = window.location.origin.includes("localhost")
    ? "http://localhost:8000"
    : window.location.origin;

  const imageMapRef = useRef<Record<string, string>>({});

  return (
    <div className="flex flex-col items-center gap-4">
      {orders.map((order) => {
        const orderId = order.order_id;
        const menus = order.OrderMenus?.map((om: any) => om.Menu).filter(Boolean);

        if (!imageMapRef.current[orderId] && menus?.length) {
          const randomMenu = menus[Math.floor(Math.random() * menus.length)];
imageMapRef.current[orderId] = `${baseUrl}/api/menus/images/${randomMenu.menu_photo}`;
        }

        const imageUrl = imageMapRef.current[orderId] || `${baseUrl}/default.jpg`;
  console.log("➡️ order", order); // 🧪

        return (
          <OrderCard
            key={orderId}
            orderNumber={`#${orderId.substring(0, 6)}`}
            units={`#${order.OrderMenus.length}`}
            totalPrice={order.total_price}
            imageUrl={imageUrl}
            onAccept={onAccept ? () => onAccept(orderId) : undefined}
          />
        );
      })}

      {[...Array(Math.max(0, 3 - orders.length))].map((_, i) => (
        <div key={i} className="h-[115px] w-[272px] rounded-xl bg-zinc-400 opacity-30" />
      ))}
    </div>
  );
};

// ---------------- OrderStatusColumn ----------------
interface OrderStatusColumnProps {
  title: string;
  color: string;
  orders: any[];
  onAccept?: (orderId: string) => void;
}

const OrderStatusColumn: React.FC<OrderStatusColumnProps> = ({
  title,
  color,
  orders,
  onAccept,
}) => (
  <div className="flex flex-col items-center gap-4">
    <button
      className="text-3xl font-bold text-orange-50 rounded-xl px-6 py-4 w-[300px] cursor-pointer"
      style={{ backgroundColor: color }}
    >
      {title}
    </button>
    <OrderColumn orders={orders} onAccept={onAccept} />
  </div>
);

// ---------------- MainContent ----------------
export const MainContent: React.FC = () => {
  const [pendingOrders, setPendingOrders] = useState<any[]>([]);
  const [preparingOrders, setPreparingOrders] = useState<any[]>([]);
  const restaurantId = "10000000-0000-0000-0000-000000000001";

  const baseUrl = window.location.origin.includes("localhost")
    ? "http://localhost:8000"
    : window.location.origin;

  const fetchOrders = async () => {
    try {


const token = localStorage.getItem("token");

      const pendingRes = await axios.get(`${baseUrl}/api/orders/pending/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const preparingRes = await axios.get(`${baseUrl}/api/orders/preparing/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPendingOrders(pendingRes.data);
      setPreparingOrders(preparingRes.data);
    } catch (err) {
      console.error("Erreur lors du fetch des commandes :", err);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval); //Ceci est un nettoyage automatique  du (MainContent) pour éviter tourner inutilement si l'utilisateur quitte la page.
  }, []);

  const handleAccept = async (orderId: string) => {
    try {
      const token = localStorage.getItem("token");

await axios.put(`${baseUrl}/api/orders/accept/${orderId}`, null, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

      fetchOrders(); // Refresh data after accept
    } catch (err) {
      console.error("Erreur lors de l'acceptation :", err);
    }
  };

  return (
    <main className="left-60 h-[949px] top-[75px] w-[1200px]">
      <nav className="text-zinc-400 text-xl text-left pl-2 mt-6">CESI-Eats &gt; Home &gt; Orders</nav>
      <h1 className="text-4xl font-bold text-slate-800 text-center mb-12">Orders</h1>
      <section className="flex justify-center gap-6">
        <OrderStatusColumn
          title="PENDING"
          color="#9B9BA1"
          orders={pendingOrders}
          onAccept={handleAccept}
        />
        <OrderStatusColumn
          title="PREPARING"
          color="#FDD835"
          orders={preparingOrders}
        />
        <OrderStatusColumn
          title="READY"
          color="#689F38"
          orders={[]} // à implémenter plus tard
        />
      </section>
    </main>
  );
};
