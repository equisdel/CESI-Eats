import * as React from "react";
import { UserHeader } from "../../Components/UserHeader.tsx";
import { Sidebar } from "../../Components/Sidebar.tsx";
import { ProfileCard } from "../../Components/ProfileCard.tsx";
import { ReferralsSection } from "../../Components/ReferralsSection.tsx";
import { OrdersSection } from "../../Components/OrdersSection.tsx";

export default function UserSettingsProfile() {
  return (
    <div className="flex overflow-hidden flex-col bg-orange-50">
      <UserHeader />
      <div className="flex flex-wrap gap-3.5 self-start">
        <Sidebar />
        <main className="grow shrink-0 self-start mt-3 basis-0 w-fit max-md:max-w-full">
          <div className="max-md:mr-2.5 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:">
              <div className="w-9/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
                  <nav className="self-start text-xl text-zinc-400">
                    CESI-Eats &gt; Home &gt; Profile
                  </nav>
                  <div className="flex flex-col pl-16 mt-12 w-full max-md:pl-5 max-md:mt-10 max-md:max-w-full">
                    <ProfileCard />
                    <h2 className="self-start mt-9 text-4xl font-bold leading-none text-slate-800">
                      LAST ORDERS
                    </h2>
                  </div>
                </div>
              </div>
              <div className="ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                <ReferralsSection />
              </div>
            </div>
          </div>
          <OrdersSection />
        </main>
      </div>
    </div>
  );
}
