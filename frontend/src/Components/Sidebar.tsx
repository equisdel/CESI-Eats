import * as React from "react";

export function Sidebar() {
  return (
    <nav className="px-3.5 pt-3.5 bg-slate-800 pb-[801px] max-md:hidden max-md:pb-24">
      <img
        src="/Images/Home.png"
        className="object-contain rounded-none aspect-square w-[60px]"
        alt="Navigation icon 1"
      />
      <img
        src="/Images/OptionSelection.png"
        className="object-contain mt-3.5 rounded-none aspect-square w-[60px]"
        alt="Navigation icon 2"
      />
    </nav>
  );
}
