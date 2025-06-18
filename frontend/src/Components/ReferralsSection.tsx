"use client";
import * as React from "react";

export function ReferralsSection() {
  return (
    <aside className="flex flex-col items-start mt-24 w-full font-bold text-slate-800 max-md:mt-10">
      <div className="px-7 py-2 text-4xl leading-none whitespace-nowrap bg-yellow-400 rounded-xl max-md:px-5">
        REFERRALS
      </div>
      <div className="flex gap-5 items-start mt-6 text-xl leading-loose">
        <img
          src="/Images/Person.png"
          className="object-contain shrink-0 mt-1.5 aspect-square w-[34px]"
          alt="User avatar"
        />
        <span className="basis-auto">User Name</span>
      </div>
      <img
        src="/Images/Person.png" 
        style={{ opacity: 0.5 }}
        className="object-contain mt-5 aspect-square w-[34px]"
        alt="User avatar"
      />
      <img
        src="/Images/Person.png" 
        style={{ opacity: 0.5 }} 
        className="object-contain mt-5 aspect-square w-[34px]"
        alt="User avatar"
      />
      <img
        src="/Images/Person.png" 
        style={{ opacity: 0.5 }}
        className="object-contain mt-5 aspect-square w-[34px]"
        alt="User avatar"
      />
      <img
        src="/Images/Person.png" 
        style={{ opacity: 0.5 }}
        className="object-contain mt-5 aspect-square w-[34px]"
        alt="User avatar"
      />
      <button className="self-stretch px-2.5 py-2 mt-7 text-3xl text-orange-50 bg-red-400 rounded-xl">
        DELETE ACCOUNT
      </button>
      <p className="self-stretch mt-2.5 mr-5 ml-2.5 text-xs leading-5 max-md:mr-2.5">
        If you choose to delete your account, all associated information will be permanently lost
      </p>
    </aside>
  );
}