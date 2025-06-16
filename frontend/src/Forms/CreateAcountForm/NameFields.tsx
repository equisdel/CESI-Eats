"use client";
import * as React from "react";

interface NameFieldsProps {
  className?: string;
}

export const NameFields: React.FC<NameFieldsProps> = ({ className = "" }) => {
  return (
    <section className={`flex gap-3 leading-10 max-md:ml-1 ${className}`}>
  <div className="flex flex-col flex-1 text-base whitespace-nowrap text-slate-800">
    <input
      type="text"
      className="w-[190px] h-12 bg-orange-50 rounded-xl border-0 px-3 placeholder-orange-400 font-normal text-base text-slate-800"
      placeholder="First name"
      aria-label="First name"
    />
  </div>
  <div className="flex-1">
    <input
      type="text"
      className="w-[188px] h-12 bg-orange-50 rounded-xl border-0 px-3 placeholder-orange-400 font-normal"
      placeholder="Last name"
      aria-label="Last name"
    />
  </div>
</section>
  );
};
