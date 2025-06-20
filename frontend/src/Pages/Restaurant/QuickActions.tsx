"use client";
import * as React from "react";

export const QuickActions: React.FC = () => {
  const handleTrackOrder = () => alert("Tracking your current order...");
  const handleOrderHistory = () => alert("Redirecting to order history...");
  const handleReferral = () => alert("Share your referral link!");

  return (
    <section className="flex flex-col items-start mt-14 w-full max-md:mt-10">
      <div className="flex gap-2.5">
        <div className="flex justify-center items-center px-2 bg-yellow-400 rounded-xl h-[38px] w-[38px]">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/dc2319f83b3a42a8a7d7e21e5b5256f0/99abba9ed4041cad851cacd7b7537c4f370b7e62?placeholderIfAbsent=true"
            className="object-contain aspect-square w-[25px]"
            alt="Track order icon"
          />
        </div>
        <button
          onClick={handleTrackOrder}
          className="my-auto text-xl font-bold text-slate-800"
        >
          TRACK AN ORDER
        </button>
      </div>

      <div className="flex gap-2.5 self-stretch mt-3">
        <div className="flex justify-center items-center px-2 bg-yellow-400 rounded-xl h-[38px] w-[38px]">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/dc2319f83b3a42a8a7d7e21e5b5256f0/6c0debc93da17ce60b1f704669a9a861146a1710?placeholderIfAbsent=true"
            className="object-contain aspect-square w-[25px]"
            alt="Order history icon"
          />
        </div>
        <button
          onClick={handleOrderHistory}
          className="my-auto text-xl font-bold text-slate-800"
        >
          SEE ORDER HISTORY
        </button>
      </div>

      <div className="flex gap-3 mt-2.5">
        <div className="flex justify-center items-center px-1.5 bg-yellow-400 rounded-xl h-[38px] w-[38px]">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/dc2319f83b3a42a8a7d7e21e5b5256f0/104bd14d9b66e6716bc316e5964f36b9f36fa9aa?placeholderIfAbsent=true"
            className="object-contain aspect-square w-[26px]"
            alt="Refer friend icon"
          />
        </div>
        <button
          onClick={handleReferral}
          className="my-auto text-xl font-bold text-slate-800"
        >
          REFER A FRIEND
        </button>
      </div>
    </section>
  );
};