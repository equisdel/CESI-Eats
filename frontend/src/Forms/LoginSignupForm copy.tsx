"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  onSignUp: () => void;
};

export function LoginSignupForm({ onSignUp }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Login request
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to log in.");
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Fetch user role
      const roleResponse = await fetch(`http://localhost:8000/api/users/role/${encodeURIComponent(email)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`, // Asegúrate de pasar el token si es requerido
        },
      });

      if (!roleResponse.ok) {
        const roleError = await roleResponse.json();
        throw new Error(roleError.message || "Failed to fetch user role.");
      }

      const roleData = await roleResponse.json();
      const role = roleData.role;

      console.log("User role:", role);

      // Redirect based on role
      if (role === "restaurant") {
        navigate("/RestaurantUser");
      } else if (role === "client") {
        navigate("/homeUser");
      } else if (role === "delivery") {
        navigate("/DeliveryUser");
      } else if (role === "technical") {
        navigate("/homeTechnical");
      } else {
        throw new Error("Unknown role. Contact support.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error instanceof Error ? error.message : "An unexpected error occurred.");
    }
  };

  return (
    <section className="absolute shrink-0 h-[231px] left-[-38px] top-[385px] w-[598px] max-md:top-80 max-md:left-[5%] max-md:w-[90%] max-sm:left-[2.5%] max-sm:top-[260px] max-sm:w-[95%]">
      <div className="absolute top-0 left-10 shrink-0 rounded-3xl bg-zinc-400 h-[231px] w-[575px] max-sm:rounded-2xl" />

      <form className="relative h-full" onSubmit={handleSubmit}>
        <div className="absolute top-44 shrink-0 h-10 rounded-xl bg-slate-800 left-[140px] w-[203px]" />

        <label className="absolute shrink-0 h-11 text-xl font-bold left-[141px] text-slate-800 top-[15px] w-[442px] max-sm:text-base">
          MAIL
        </label>

        <label className="absolute shrink-0 h-11 text-xl font-bold left-[141px] text-slate-800 top-[93px] w-[442px] max-sm:text-base">
          PASSWORD
        </label>

        <button
          type="button"
          className="absolute shrink-0 h-11 text-base text-right underline underline decoration-auto decoration-solid left-[141px] text-slate-800 top-[83px] underline-offset-auto w-[430px] bg-transparent border-none cursor-pointer"
        >
          I forgot my password!
        </button>

        <div className="absolute top-44 shrink-0 h-10 bg-yellow-400 rounded-xl left-[367px] w-[203px]" />

        <input
          type="email"
          className="absolute shrink-0 h-10 bg-orange-50 rounded-xl left-[140px] top-[43px] w-[431px] border-none px-3"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="absolute shrink-0 h-10 bg-orange-50 rounded-xl left-[140px] top-[119px] w-[431px] border-none px-3"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="absolute shrink-0 text-xl font-bold text-center h-[33px] left-[404px] text-slate-800 top-[180px] w-[130px] max-sm:text-base bg-transparent border-none cursor-pointer"
        >
          LOG IN
        </button>

        <button
          type="button"
          onClick={onSignUp}
          className="absolute shrink-0 text-xl font-bold text-center text-orange-50 h-[33px] left-[170px] top-[180px] w-[145px] max-sm:text-base bg-transparent border-none cursor-pointer"
        >
          SIGN UP
        </button>
      </form>
    </section>
  );
}

export default LoginSignupForm;