import React from "react";

type Props = {
  selectedRole: string;
  setSelectedRole: (role: string) => void;
};

const icons = [
  {
    role: "restaurant",
    src: "/Images/restaurant.png",
    alt: "Restaurant",
    top: 72,
  },
  {
    role: "delivery",
    src: "/Images/delivery.png",
    alt: "Delivery",
    top: 204,
  },
  {
    role: "client",
    src: "/Images/client.png",
    alt: "Client",
    top: 336,
  },
  {
    role: "technical",
    src: "/Images/technical.png",
    alt: "Technical",
    top: 468,
  },
];

export function DecorationIcons({ selectedRole, setSelectedRole }: Props) {
  return (
    <aside className="max-md:hidden relative">
      {/* Orange circle SVG backgrounds (same as your original) */}
      {icons.map(({ role, top }, i) => (
        <div key={`circle-${role}`}>
          <div
            dangerouslySetInnerHTML={{
              __html: `<svg width="100" height="100" viewBox="0 0 100 100" fill="#FFBF81" xmlns="http://www.w3.org/2000/svg" style="position: absolute; left: 1254px; top: ${top}px; width: 100px; height: 100px; flex-shrink: 0;">
                <circle cx="50" cy="50" r="50" fill="#FFBF81"></circle>
              </svg>`,
            }}
          />
        </div>
      ))}

      {/* Buttons with icons on top of the circles */}
      {icons.map(({ role, src, alt, top }) => (
        <button
          key={role}
          type="button"
          onClick={() => setSelectedRole(role)}
          className={`flex absolute justify-center items-center bg-orange-300 h-[100px] w-[100px] left-[1254px] rounded-full`}
          style={{
            top: `${top}px`,
            outline: "none",
            boxShadow:
              selectedRole === role
                ? "0 0 0 8px #2F2E41" // thick ring effect with #2F2E41 color
                : "none",
          }}
          aria-pressed={selectedRole === role}
        >
          <img
            src={src}
            alt={alt}
            className="absolute"
            style={{
              top: role === "restaurant" ? "0px" : "4px", 
              left: role === "restaurant" ? "-3px" : "9px", 
              height: role === "restaurant" ? "106px" : "84px",
              width: role === "restaurant" ? "106px" : "82px",
              objectFit: "contain",
            }}
          />
        </button>
      ))}
    </aside>
  );
}

