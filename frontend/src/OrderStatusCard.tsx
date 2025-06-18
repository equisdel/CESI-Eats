import React from 'react';

interface OrderStatusCardProps {
  count: number;
  status: string;
  bgColor: string;
  textColor?: string;
}

export const OrderStatusCard: React.FC<OrderStatusCardProps> = ({
  count,
  status,
  bgColor,
  textColor = "text-orange-50"
}) => {
  return (
    <div className="flex flex-col grow px-3 pb-2.5 w-full whitespace-nowrap bg-orange-50 rounded-xl max-md:mt-6">
      <div className="z-10 self-center mt-0 text-8xl text-slate-800 max-md:text-4xl">
        {count}
      </div>
      <div className={`px-4 py-0.5 mt-11 text-xl font-bold ${textColor} ${bgColor} rounded-xl max-md:mt-10`}>
        {status}
      </div>
    </div>
  );
};
