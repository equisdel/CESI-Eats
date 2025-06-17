"use client";

interface PasswordFieldProps {
  className?: string;
  password: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  className = "",
  password,
  onChange,
}) => {
  return (
    <div className={className}>
      <input
        type="password"
        name="password"
        value={password}
        onChange={onChange}
        className="w-full h-12 bg-orange-50 rounded-xl border-0 px-3 placeholder-orange-400 font-normal text-base text-slate-800"
        placeholder="Use 8 or more characters mixing letters and numbers, with at least one special symbol"
        aria-label="Password"
        required
      />
    </div>
  );
};