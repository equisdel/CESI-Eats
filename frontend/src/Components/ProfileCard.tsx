import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface UserData {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  birthday_date: string; // Formatted as "YYYY-MM-DD"
  created_at?: string;
  avatar?: string;
}

export function ProfileCard() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserData | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage.");
      return;
    }

    const decoded: any = jwtDecode(token);
    const emailUser = encodeURIComponent(decoded.email);

    fetch(`http://localhost:8000/api/users/email/${emailUser}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.birthday_date) {
          const date = new Date(data.birthday_date);
          data.birthday_date = isNaN(date.getTime())
            ? ""
            : date.toISOString().split("T")[0]; // Format to "YYYY-MM-DD"
        }
        setUser(data);
        setFormData(data);
      })
      .catch((err) => console.error("Error fetching user data:", err));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveChanges = () => {
  if (!formData) return;

  const token = localStorage.getItem("token");
  if (!token) return;

  const correctedDate = new Date(formData.birthday_date);
  if (isNaN(correctedDate.getTime())) {
    alert("Invalid date format. Please select a valid date.");
    return;
  }

  const formattedDate = correctedDate.toISOString().split("T")[0];
  const updatedFormData = { ...formData, birthday_date: formattedDate };

  fetch(`http://localhost:8000/api/users/update/${formData.user_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedFormData),
  })
    .then((res) => res.json())
    .then(() => {
      // Volver a cargar la información del usuario
      fetch(`http://localhost:8000/api/users/email/${encodeURIComponent(formData.email)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.birthday_date) {
            const date = new Date(data.birthday_date);
            data.birthday_date = isNaN(date.getTime())
              ? ""
              : date.toISOString().split("T")[0];
          }
          setUser(data);
          setIsEditing(false);
        });
    })
    .catch((err) => console.error("Error updating user data:", err));
};


  if (!user || !formData) return <div>Loading...</div>;

  return (
    <section className="relative px-7 py-6 rounded-3xl bg-zinc-400 max-md:px-5 max-md:max-w-full">
      {isEditing && (
        <div className="absolute inset-0 z-10 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-3xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <form className="space-y-4">
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                placeholder="First Name"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="w-full p-2 border rounded"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="w-full p-2 border rounded"
              />
              <input
                type="date"
                name="birthday_date"
                value={formData.birthday_date || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </form>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleSaveChanges}
              >
                Confirm Changes
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex gap-5 max-md:flex-col">
        {!isEditing && (
          <>
            <div className="w-[56%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col mt-5 text-3xl font-bold max-md:mt-10">
                <div className="flex flex-col pl-1.5 text-slate-800">
                  <h1 className="text-4xl leading-none">
                    {user.first_name} {user.last_name}
                  </h1>
                  <h2 className="self-start mt-5">EMAIL</h2>
                  <div className="mt-4 mr-7 text-orange-50 max-md:mr-2.5">
                    <a
                      href={`mailto:${user.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {user.email}
                    </a>
                  </div>
                </div>
                <h3 className="self-start mt-10 text-slate-800">BIRTHDAY</h3>
                <p className="self-start mt-5 text-orange-50">
                  {user.birthday_date
                    ? new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }).format(new Date(user.birthday_date))
                    : "No birthday date available"}
                </p>
                <div className="flex flex-col items-start pr-16 pl-1.5 mt-5 max-md:pr-5">
                  <h3 className="text-slate-800">PHONE NUMBER</h3>
                  <p className="mt-6 text-orange-50">{user.phone_number}</p>
                </div>
              </div>
            </div>
            <div className="ml-5 w-[44%] max-md:ml-0 max-md:w-full">
              <button
                className="flex gap-4 py-2 pr-2.5 pl-6 mt-7 text-2xl font-bold leading-relaxed rounded-xl bg-zinc-300 text-slate-800 max-md:pl-5 w-full"
                onClick={() => {
                  setFormData(user);
                  setIsEditing(true);
                }}
              >
                Edit Profile
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

