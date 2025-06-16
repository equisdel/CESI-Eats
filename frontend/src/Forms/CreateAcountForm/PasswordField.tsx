"use client";
import * as React from "react";

interface PasswordFieldProps {
  className?: string;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({ className = "" }) => {
  return (
    <div className={className}>
      <label className="z-10 self-start mt-2.5 text-base font-bold leading-10 text-slate-800 max-md:ml-1 block">
        PASSWORD
      </label>
      <input
        type="password"
        className="px-5 py-2.5 text-xs font-bold leading-4 text-orange-300 bg-orange-50 rounded-xl max-md:ml-0.5 w-full border-0"
        placeholder="Use 8 or more characters mixing letters and numbers, with at least one special symbol"
        aria-label="Password"
      />
    </div>
  );
};
