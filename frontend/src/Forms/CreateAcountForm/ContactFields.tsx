"use client";
import * as React from "react";

interface ContactFieldsProps {
  className?: string;
}

export const ContactFields: React.FC<ContactFieldsProps> = ({ className = "" }) => {
  return (
    <section className={`flex gap-3 leading-10 max-md:ml-1 ${className}`}>
      <div className="flex flex-col flex-1 text-base whitespace-nowrap text-slate-800">
        <label className="self-start mb-1 font-bold">
          BIRTHDATE
        </label>
        <input
          type="date"
          className="w-[188px] h-12 bg-orange-50 rounded-xl border-0 px-3 font-normal text-base text-slate-800"
          aria-label="Birthdate"
        />
      </div>
      <div className="flex flex-col flex-1 text-base whitespace-nowrap text-slate-800">
        <label className="self-start mb-1 font-bold">
          PHONE NUMBER <span className="text-xs font-normal">(optional)</span>
        </label>
        <input
          type="tel"
          className="w-[188px] h-12 bg-orange-50 rounded-xl border-0 px-3 font-normal text-base text-slate-800"
          placeholder="Phone number"
          aria-label="Phone number"
        />
      </div>
    </section>
  );
};