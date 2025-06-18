import React from "react";
import { HeroSection } from "../../Components/HeroSection.tsx";
import { DecorationIcons } from "../../Components/DecorationIcons.tsx";
import { LoginSignupForm } from "../../Forms/LoginSignupForm.tsx";
import { CreateAccountForm } from "../../Forms/CreateAcountForm/CreateAccountForm.tsx";

function WelcomePageContent() {
  const [role, setRole] = React.useState("");
  const [showCreateAccount, setShowCreateAccount] = React.useState(false);

  const handleSignUp = () => {
    if (role) {
      setShowCreateAccount(true);
    } else {
      alert("Please select a role before signing up.");
    }
  };

  const handleCancelCreate = () => {
    setShowCreateAccount(false);
  };

  return (
    <main className="relative mx-auto my-0 w-full bg-orange-50 h-[1024px] max-w-[1440px] max-md:p-5 max-md:h-auto max-sm:p-4 max-sm:h-auto">
      <HeroSection role={role} />
      <DecorationIcons selectedRole={role} setSelectedRole={setRole} />
      <div className="absolute left-0 shrink-0 w-full bg-slate-800 h-[376px] top-[648px] max-md:h-[200px] max-md:top-[580px] max-sm:h-[150px] max-sm:top-[520px]" />
      <LoginSignupForm onSignUp={handleSignUp} />
      {showCreateAccount && (
        <CreateAccountForm onCancel={handleCancelCreate} role={role} />
      )}
    </main>
  );
}

export default WelcomePageContent;