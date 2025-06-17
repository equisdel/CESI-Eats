"use client";

interface EmailFieldProps {
  className?: string;
  email: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EmailField: React.FC<EmailFieldProps> = ({
  className = "",
  email,
  onChange,
}) => {
  return (
    <div className={className}>
      <input
        type="email"
        name="email"
        value={email}
        onChange={onChange}
        className="w-full h-12 bg-orange-50 rounded-xl border-0 px-3 placeholder-orange-400 font-normal text-base text-slate-800"
        placeholder="Email"
        aria-label="Email"
        required
      />
    </div>
  );
};