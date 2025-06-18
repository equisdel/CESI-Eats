"use client";

import React, { useState } from "react";

interface EmailFieldProps {
  className?: string;
  email: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EmailField: React.FC<EmailFieldProps> = ({
  className = "",
  email,
  onChange,
}) => {
  const [error, setError] = useState<string>("");

  // Function to validate the email format
  const validateEmail = (value: string) => {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Basic email regex
    if (!emailRegex.test(value)) {
      return "Invalid email address format.";
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const validationError = validateEmail(value);

    setError(validationError);
    onChange(e);
  };

  return (
    <div className={`flex flex-col mb-4 ${className}`}>
      <label htmlFor="email" className="mb-1 font-bold text-slate-800">
        EMAIL
      </label>
      <input
        id="email"
        type="email"
        name="email"
        value={email}
        onChange={handleChange}
        className={`w-full h-12 bg-orange-50 rounded-xl border-0 px-3 placeholder-orange-400 font-normal text-base text-slate-800 ${
          error ? "border-red-500" : ""
        }`}
        placeholder="Email"
        aria-label="Email"
        required
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};