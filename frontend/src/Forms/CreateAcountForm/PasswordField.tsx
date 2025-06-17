"use client";

import React, { useState } from "react";

interface PasswordFieldProps {
  className?: string;
  password: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  className = "",
  password,
  onChange,
}) => {
  const [error, setError] = useState<string>("");

  // Function to validate the password
  const validatePassword = (value: string) => {
    const lengthRequirement = /.{8,}/; // At least 8 characters
    const letterRequirement = /[A-Za-z]/; // Includes letters
    const numberRequirement = /[0-9]/; // Includes numbers
    const specialCharRequirement = /[!@#$%^&*(),.?":{}|<>]/; // Includes special characters

    if (!lengthRequirement.test(value)) {
      return "Password must be at least 8 characters long.";
    }
    if (!letterRequirement.test(value)) {
      return "Password must include at least one letter.";
    }
    if (!numberRequirement.test(value)) {
      return "Password must include at least one number.";
    }
    if (!specialCharRequirement.test(value)) {
      return "Password must include at least one special character.";
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const validationError = validatePassword(value);

    setError(validationError);
    onChange(e);
  };

  return (
    <div className={`flex flex-col mb-4 ${className}`}>
      <label htmlFor="password" className="mb-1 font-bold text-slate-800">
        PASSWORD
      </label>
      <input
        id="password"
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
        className={`w-full h-12 bg-orange-50 rounded-xl border-0 px-3 placeholder-orange-400 font-normal text-base text-slate-800 ${
          error ? "border-red-500" : ""
        }`}
        placeholder="Use 8 or more characters mixing letters and numbers, with at least one special symbol"
        aria-label="Password"
        required
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};