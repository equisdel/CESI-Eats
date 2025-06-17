"use client";
import * as React from "react";

interface NameFieldsProps {
  className?: string;
  firstname: string;
  lastname: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const NameFields: React.FC<NameFieldsProps> = ({
  className = "",
  firstname,
  lastname,
  onChange,
}) => {
  return (
    <section className={`flex gap-3 leading-10 max-md:ml-1 ${className}`}>
      <div className="flex flex-col flex-1 text-base whitespace-nowrap text-slate-800">
        <label className="mb-1 font-bold text-slate-800" htmlFor="firstname">
          FIRST NAME
        </label>
        <input
          id="firstname"
          type="text"
          name="firstname"
          value={firstname}
          onChange={onChange}
          className="w-full h-12 bg-orange-50 rounded-xl border-0 px-3 placeholder-orange-400 font-normal text-base text-slate-800"
          placeholder="First name"
          aria-label="First name"
        />
      </div>
      <div className="flex flex-col flex-1 text-base whitespace-nowrap text-slate-800">
        <label className="mb-1 font-bold text-slate-800" htmlFor="lastname">
          LAST NAME
        </label>
        <input
          id="lastname"
          type="text"
          name="lastname"
          value={lastname}
          onChange={onChange}
          className="w-full h-12 bg-orange-50 rounded-xl border-0 px-3 placeholder-orange-400 font-normal text-base text-slate-800"
          placeholder="Last name"
          aria-label="Last name"
        />
      </div>
    </section>
  );
};