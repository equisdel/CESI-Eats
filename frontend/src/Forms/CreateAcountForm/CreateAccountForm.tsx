"use client";
import React, { useState } from "react";
import { FormHeader } from "./FormHeader.tsx";
import { NameFields } from "./NameFields.tsx";
import { ContactFields } from "./ContactFields.tsx";
import { EmailField } from "./EmailField.tsx";
import { PasswordField } from "./PasswordField.tsx";
import { ActionButtons } from "./ActionButtons.tsx";

interface CreateAccountFormProps {
  onCancel?: () => void;
  onCreate?: () => void;
}

export const CreateAccountForm: React.FC<CreateAccountFormProps> = ({
  onCancel,
  onCreate,
  role
}) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    phone_number: "",
    birthday_date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      type: role,
      email: form.email,
      password: form.password,
      info: {
        first_name: form.firstname,   
        last_name: form.lastname,     
        phone_number: form.phone_number,
        birthday_date: form.birthday_date,
      },
    };
    console.log("!!!",JSON.stringify(payload))
    await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    onCreate?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <main className="overflow-hidden bg-orange-50 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-xl">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col px-10 pt-1 pb-1 mb-0 max-w-full rounded-xl bg-zinc-400 w-[471px]"
        >
          <button
            type="button"
            onClick={onCancel}
            className="absolute top-4 right-4 text-2xl text-gray-700 hover:text-red-500"
            aria-label="Close"
          >
            ×
          </button>
          <FormHeader 
          />
          <NameFields
            className="mt-4"
            firstname={form.firstname}
            lastname={form.lastname}
            onChange={handleChange}
          />
          <ContactFields
            className="mt-4"
            phone_number={form.phone_number}
            birthday_date={form.birthday_date}
            onChange={handleChange}
          />
          <EmailField
            email={form.email}
            onChange={handleChange}
          />
          <PasswordField
            password={form.password}
            onChange={handleChange}
          />
          <ActionButtons
            onCancel={onCancel}
            onCreate={onCreate}
          />
        </form>
      </main>
    </div>
  );
};