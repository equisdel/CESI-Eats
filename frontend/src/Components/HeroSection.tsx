import * as React from "react";

type Props = {
  role: string;
};

const roleMessages: Record<string, string> = {
  restaurant: "Ready to manage your restaurant orders?",
  delivery: "Ready to deliver delicious meals?",
  client: "Ready to order a delicious meal?",
  technical: "Ready to support our platform?",
};

export function HeroSection({ role }: Props) {
  const message =
    roleMessages[role] ||
    "Ready to order a delicious meal?";

  return (
    <section className="relative">
      <div className="absolute shrink-0 text-2xl font-bold h-[90px] left-[990px] text-slate-800 top-[100px] w-[833px] max-md:w-3/5 max-md:text-xl max-md:left-[35%] max-md:top-[80px] max-sm:left-[5%] max-sm:top-[60px] max-sm:w-[90%]">
        <p>Choose your role:</p>
      </div>

      <img
        src="/Images/PeopleEating.png"
        alt="EATS (2) 1"
        className="absolute shrink-0 aspect-[833/500] h-[500px] left-[490px] top-[178px] w-[833px] max-md:w-3/5 max-md:h-auto max-md:left-[35%] max-md:top-[120px] max-sm:left-[5%] max-sm:top-[100px] max-sm:w-[90%]"
      />

      <img
        src="/Images/CesiEatsLogo.png"
        alt="EATS (1) 1"
        className="absolute -top-5 shrink-0 aspect-[5/3] h-[276px] left-[88px] w-[460px] max-md:top-0 max-md:w-6/12 max-md:h-auto max-md:left-[5%] max-sm:top-2.5 max-sm:w-4/5 max-sm:left-[10%]"
      />

      <div className="absolute shrink-0 text-4xl h-[50px] left-[98px] text-slate-800 top-[212px] w-[462px] max-md:w-4/5 max-md:text-3xl max-md:left-[5%] max-md:top-[180px] max-sm:text-2xl max-sm:left-[5%] max-sm:top-[150px] max-sm:w-[90%]">
        <p>Hunger won’t wait, and neither do we</p>
      </div>

      <div className="absolute shrink-0 text-3xl font-bold h-[50px] left-[98px] text-slate-800 top-[344px] w-[482px] max-md:w-4/5 max-md:text-2xl max-md:left-[5%] max-md:top-[280px] max-sm:text-lg max-sm:left-[5%] max-sm:top-[220px] max-sm:w-[90%]">
        <h1>{message}</h1>
      </div>
    </section>
  );
}