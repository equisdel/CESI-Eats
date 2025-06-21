import React, { useState } from "react";
import ProfileIcon from "../../assets/Profile-Icon.png";


// ---------------- OrderCard ----------------
interface OrderCardProps {
  title: string;
  orderNumber: string;
  units: string;
}

const OrderCard: React.FC<OrderCardProps> = ({
  title,
  orderNumber,
  units,
}) => {
  return (
    <article className="relative h-[140px] w-[272px] rounded-xl bg-zinc-400 p-2">
      <div className="flex">

        <div className="ml-3 flex flex-col justify-between py-1">
          <div>
            <h3 className="text-xl font-bold text-slate-800 leading-tight">{title}</h3>
            <p className="text-slate-800 text-base mt-1">
              ORDER: <span className="font-bold">{orderNumber}</span>
              <br />
              UNITS: <span className="font-bold">{units}</span>
            </p>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="text-xs text-orange-50 bg-red-400 rounded-xl px-3 py-1 hover:bg-red-500 transition">
              REFUSE
            </button>
            <button className="text-xs text-orange-50 bg-lime-600 rounded-xl px-3 py-1 hover:bg-lime-700 transition">
              ACCEPT
            </button>
            
<button className="text-xs rounded-full w-[25px] h-[25px] bg-[#ACA8AC] text-center text-white font-bold flex items-center justify-center">
  <img src={ProfileIcon} alt="Profile Icon" className="w-[15px] h-[15px]" />
</button>
          </div>
        </div>
      </div>
    </article>
  );
};

// ---------------- OrderColumn ----------------
interface OrderColumnProps {
  hasActiveOrder?: boolean;
}

const OrderColumn: React.FC<OrderColumnProps> = ({ hasActiveOrder = false }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      {hasActiveOrder && (
        <OrderCard
          title="Pepperoni Pizza"
          orderNumber="#101"
          units="#2"

        />
      )}
      <div className="h-[115px] w-[272px] rounded-xl bg-zinc-400 opacity-30" />
      <div className="h-[115px] w-[272px] rounded-xl bg-zinc-400 opacity-30" />
      <div className="h-[115px] w-[272px] rounded-xl bg-zinc-400 opacity-30" />
    </div>
  );
};

// ---------------- OrderStatusColumn ----------------
interface OrderStatusColumnProps {
  title: string;
  color: string;
  hasOrder?: boolean;
}

const OrderStatusColumn: React.FC<OrderStatusColumnProps> = ({
  title,
  color,
  hasOrder = false,
}) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <button
        className="text-3xl font-bold text-orange-50 rounded-xl px-6 py-4 w-[300px] cursor-pointer transition duration-200 hover:brightness-110"
        style={{ backgroundColor: color }}
      >
        {title}
      </button>
      <OrderColumn hasActiveOrder={hasOrder} />
      
    </div>
  );
};

// ---------------- MainContent ----------------
export const MainContent: React.FC = () => {
  return (
    <main className=" left-60 h-[949px] top-[75px] w-[1200px] max-md:left-[200px] max-md:w-[calc(100%_-_200px)] max-sm:left-0 max-sm:px-4 max-sm:py-0 max-sm:w-full max-sm:top-[140px]">

      {/* Breadcrumb */}
      <nav className="text-zinc-400 text-xl text-left pl-2 mt-6 max-sm:text-sm max-sm:pl-1">
    CESI-Eats &gt; Home &gt; Orders
  </nav>

      {/* Title */}
      <h1 className="text-4xl font-bold text-slate-800 text-center mb-12 max-sm:text-3xl">
        Orders
      </h1>

      {/* Columns + headers */}
      <section className="flex justify-center gap-6 max-md:flex-col max-md:items-center">
        <OrderStatusColumn title="PENDING" color="#9B9BA1" hasOrder />
        <OrderStatusColumn title="PREPARING" color="#FDD835" />
        <OrderStatusColumn title="READY" color="#689F38" />
      </section>
    </main>
  );
};
