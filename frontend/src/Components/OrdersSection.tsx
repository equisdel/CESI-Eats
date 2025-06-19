import * as React from "react";

export function OrdersSection() {
  return (
    <section className="flex flex-wrap gap-3.5 mt-9 ml-6">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/25235110cabb53cd5c987d1f1a0bd2f45f99c8cc?placeholderIfAbsent=true&apiKey=f294b09e98904155a5efb7785ba92315"
        className="object-contain shrink-0 my-auto aspect-square w-[30px]"
        alt="Previous orders"
      />
      <div className="flex shrink-0 rounded-xl bg-zinc-400 h-[250px] w-[200px]" />
      <div className="flex shrink-0 rounded-xl bg-zinc-400 h-[250px] w-[200px]" />
      <div className="flex shrink-0 rounded-xl bg-zinc-400 h-[250px] w-[200px]" />
      <div className="flex shrink-0 rounded-xl bg-zinc-400 h-[250px] w-[200px]" />
      <div className="flex shrink-0 rounded-xl bg-zinc-400 h-[250px] w-[200px]" />
      <div className="flex shrink-0 rounded-xl bg-zinc-400 h-[250px] w-[90px]" />
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/12222de5ebb0201a01d248cba99fe653d8dc8b54?placeholderIfAbsent=true&apiKey=f294b09e98904155a5efb7785ba92315"
        className="object-contain shrink-0 my-auto aspect-square w-[30px]"
        alt="Next orders"
      />
    </section>
  );
}

