import React, { useState } from "react";
import { FormHeader } from "./FormHeader.tsx";
import { NameFields } from "./NameFields.tsx";
import { ContactFields } from "./ContactFields.tsx";
import { EmailField } from "./EmailField.tsx";
import { PasswordField } from "./PasswordField.tsx";
import { ActionButtons } from "./ActionButtons.tsx";
import { RestaurantExtraFields } from "./RestaurantExtraFields.tsx";

interface CreateAccountFormProps {
  onCancel?: () => void;
  onCreate?: () => void;
  role: string; // "restaurant" o another one
}

export const CreateAccountForm: React.FC<CreateAccountFormProps> = ({
  onCancel,
  onCreate,
  role,
}) => {
  const [step, setStep] = useState(1);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null); // Estado para feedback

  const [form, setForm] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    phone_number: "",
    birthday_date: "",
  });

  const [restaurantInfo, setRestaurantInfo] = useState({
    name: "",
    email: "",
    phone_number: "",
    address: "",
    open_hour: "",
    close_hour: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (step === 1) {
      setForm({ ...form, [name]: value });
    } else {
      setRestaurantInfo({ ...restaurantInfo, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (role === "restaurant" && step === 1) {
      setStep(2);
      return;
    }

    const payload = {
      role: role,
      email: form.email,
      password: form.password,
      info: {
        first_name: form.firstname,
        last_name: form.lastname,
        phone_number: form.phone_number,
        birthday_date: form.birthday_date,
      },
      ...(role === "restaurant" ? { restaurantInfo } : {}),
    };

    console.log("infoUser: ",payload);
    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to create account");
      }

      setFeedbackMessage("Account created successfully! 🎉"); // Mensaje de éxito
      onCreate?.();
    } catch (error) {
      console.error(error);
      setFeedbackMessage("Failed to create account. Please try again."); // Mensaje de error
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <main className="overflow-hidden bg-orange-50 shadow rounded-xl">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col px-10 pt-1 pb-1 max-w-full rounded-xl bg-zinc-400 w-[471px]"
        >
          <button
            type="button"
            onClick={onCancel}
            className="absolute top-4 right-4 text-2xl text-gray-700 hover:text-red-500"
            aria-label="Close"
          >
            ×
          </button>

          {step === 1 && <FormHeader />}

          {step === 1 && (
            <div className="flex flex-col gap-4">
              <NameFields
                firstname={form.firstname}
                lastname={form.lastname}
                onChange={handleChange}
              />
              <ContactFields
                phone_number={form.phone_number}
                birthday_date={form.birthday_date}
                onChange={handleChange}
              />
              <EmailField email={form.email} onChange={handleChange} />
              <PasswordField password={form.password} onChange={handleChange} />
            </div>
          )}

          {step === 2 && role === "restaurant" && (
            <>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="mb-2 text-lg text-orange-600 hover:text-orange-800 flex items-center"
                aria-label="Back"
                style={{ width: "fit-content" }}
              >
                ← Back
              </button>
              <h2 className="flex-auto self-start text-3xl font-bold text-slate-800 mb-4 text-center">
                Restaurant Information
              </h2>
              <RestaurantExtraFields data={restaurantInfo} onChange={handleChange} />
            </>
          )}

          {feedbackMessage && (
            <p
              className={`text-center mt-2 text-lg ${
                feedbackMessage.includes("success") ? "text-green-500" : "text-red-500"
              }`}
            >
              {feedbackMessage}
            </p>
          )}

          <ActionButtons
            onCancel={onCancel}
            submitLabel={role === "restaurant" && step === 1 ? "Next" : "Create"}
          />
        </form>
      </main>
    </div>
  );
};