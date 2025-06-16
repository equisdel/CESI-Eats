"use client";
import * as React from "react";

interface FormHeaderProps {
  className?: string;
}

export const FormHeader: React.FC<FormHeaderProps> = ({ className = "" }) => {
  return (
    <header className={`flex gap-3 items-start self-start font-bold text-slate-800 max-md:ml-1 mt-8 ${className}`}>
      <div className="self-end mt-14 ml-2 text-2xl leading-6">
        NAME
      </div>
      <h1 className="flex-auto self-start text-3xl">
        CREATE ACCOUNT
      </h1>
    </header>
    
  );
};
