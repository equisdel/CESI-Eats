"use client";

import React, { useState } from "react";

interface ContactFieldsProps {
  className?: string;
  phone_number: string;
  birthday_date: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ContactFields: React.FC<ContactFieldsProps> = ({
  className = "",
  phone_number,
  birthday_date,
  onChange,
}) => {
  const [phoneError, setPhoneError] = useState<string>("");

  // Function to validate phone number
  const validatePhoneNumber = (value: string) => {
    const phoneRegex = /^[+]?[0-9]{1,4}?[-.\s]?(\d{1,3}[-.\s]?){1,4}$/;
    if (value && !phoneRegex.test(value)) {
      return "Invalid phone number format.";
    }
    return "";
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const validationError = validatePhoneNumber(value);

    setPhoneError(validationError);
    onChange(e);
  };

  return (
    <section className={`flex gap-3 leading-10 max-md:ml-1 ${className}`}>
      <div className="flex flex-col flex-1 text-base whitespace-nowrap text-slate-800">
        <label className="mb-1 font-bold text-slate-800" htmlFor="birthday_date">
          BIRTHDATE
        </label>
        <input
          id="birthday_date"
          type="date"
          name="birthday_date"
          value={birthday_date}
          onChange={onChange}
          className="w-full h-12 bg-orange-50 rounded-xl border-0 px-3 font-normal text-base text-slate-800"
          aria-label="Birthdate"
        />
      </div>
      <div className="flex flex-col flex-1 text-base whitespace-nowrap text-slate-800">
        <label className="mb-1 font-bold text-slate-800" htmlFor="phone_number">
          PHONE NUMBER <span className="text-xs font-normal">(optional)</span>
        </label>
        <input
          id="phone_number"
          type="tel"
          name="phone_number"
          value={phone_number}
          onChange={handlePhoneChange}
          className={`w-full h-12 bg-orange-50 rounded-xl border-0 px-3 font-normal text-base text-slate-800 ${
            phoneError ? "border-red-500" : ""
          }`}
          placeholder="Phone number"
          aria-label="Phone number"
        />
        {phoneError && <p className="text-red-500 text-sm mt-2">{phoneError}</p>}
      </div>
    </section>
  );
};