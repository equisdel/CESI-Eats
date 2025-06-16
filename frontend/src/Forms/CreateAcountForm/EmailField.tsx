"use client";
import * as React from "react";

interface EmailFieldProps {
  className?: string;
}

export const EmailField: React.FC<EmailFieldProps> = ({ className = "" }) => {
  return (
    <div className={className}>
      <div className="self-end mt-14 ml-2 text-2xl leading-6 flex gap-3 items-start self-start font-bold text-slate-800 max-md:ml-1">
        EMAIL
      </div>
      <input
        type="email"
        className="px-4 py-0.5 mt-9 w-full text-xs font-bold leading-10 text-orange-300 bg-orange-50 rounded-xl max-md:pr-5 max-md:mr-0.5 border-0"
        placeholder="example@gmail.com"
        defaultValue="example@gmail.com"
        aria-label="Email address"
      />
    </div>
  );
};
