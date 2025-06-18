import React from "react";

interface RestaurantExtraFieldsProps {
  data: {
    name: string;
    email: string;
    phone_number: string;
    address: string;
    open_hour: string;
    close_hour: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RestaurantExtraFields: React.FC<RestaurantExtraFieldsProps> = ({
  data,
  onChange,
}) => {
  return (
    <>
      <input
        name="name"
        value={data.name}
        onChange={onChange}
        placeholder="Restaurant Name"
        required
        className="mb-2 p-2 rounded border"
      />
      <input
        name="email"
        type="email"
        value={data.email}
        onChange={onChange}
        placeholder="Restaurant Email"
        required
        className="mb-2 p-2 rounded border"
      />
      <input
        name="phone_number"
        value={data.phone_number}
        onChange={onChange}
        placeholder="Phone Number"
        required
        className="mb-2 p-2 rounded border"
      />
      <input
        name="address"
        value={data.address}
        onChange={onChange}
        placeholder="Address"
        required
        className="mb-2 p-2 rounded border"
      />
      <input
        name="open_hour"
        value={data.open_hour}
        onChange={onChange}
        placeholder="Open Hour (e.g. 08:00)"
        required
        className="mb-2 p-2 rounded border"
      />
      <input
        name="close_hour"
        value={data.close_hour}
        onChange={onChange}
        placeholder="Close Hour (e.g. 22:00)"
        required
        className="mb-2 p-2 rounded border"
      />
    </>
  );
};
