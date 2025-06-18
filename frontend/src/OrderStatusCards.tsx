import React from 'react';
import { OrderStatusCard } from './OrderStatusCard.tsx';

export const OrderStatusCards: React.FC = () => {
  return (
    <section className="px-3.5 py-3 rounded-xl bg-zinc-400 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col max-md:">
        <div className="w-3/12 max-md:ml-0 max-md:w-full">
          <OrderStatusCard
            count={0}
            status="PENDING"
            bgColor="bg-zinc-400"
            textColor="text-orange-50"
          />
        </div>

        <div className="ml-5 w-3/12 max-md:ml-0 max-md:w-full">
          <OrderStatusCard
            count={0}
            status="PREPARING"
            bgColor="bg-yellow-400"
            textColor="text-orange-50"
          />
        </div>

        <div className="ml-5 w-3/12 max-md:ml-0 max-md:w-full">
          <OrderStatusCard
            count={0}
            status="READY"
            bgColor="bg-lime-600"
            textColor="text-orange-50"
          />
        </div>

        <div className="ml-5 w-3/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow px-5 py-3 w-full text-xl font-bold text-orange-50 bg-orange-300 rounded-xl max-md:px-5 max-md:mt-6">
            <div className="flex shrink-0 self-center bg-orange-300 rounded-xl h-[87px] w-[103px]" />
            <div>ALL ORDERS</div>
          </div>
        </div>
      </div>
    </section>
  );
};
