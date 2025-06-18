"use client";
import React from "react";

export const FormHeader: React.FC = () => (
  <header className="mt-6 mb-6">
    <h1 className="text-3xl font-extrabold text-slate-800 text-center tracking-wide pt-2">
      CREATE ACCOUNT
    </h1>
    <p className="text-base text-slate-500 text-center mt-2">
      Enter your personal information to get started
    </p>
  </header>
);

export default FormHeader;