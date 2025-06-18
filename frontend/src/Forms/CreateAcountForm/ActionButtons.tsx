"use client";
import * as React from "react";

interface ActionButtonsProps {
  onCancel?: () => void;
  onCreate?: () => void;
  className?: string;
  submitLabel?: string; // Label for the submit button, e.g. "Create" or "Next"
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onCancel,
  onCreate,
  className = "",
  submitLabel = "CREATE", // Default label
}) => {
  return (
    <div
      className={`flex gap-4 justify-center mt-2 max-w-full text-3xl font-bold whitespace-nowrap w-[356px] ${className}`}
    >
      {/* Cancel button */}
      <button
        type="button"
        onClick={onCancel}
        className="px-5 py-2 text-orange-50 rounded-3xl bg-slate-800 max-md:pr-5 hover:bg-slate-700 transition-colors"
        aria-label="Cancel account creation"
      >
        CANCEL
      </button>

      {/* Submit button */}
      <button
        type="submit"
        onClick={onCreate}
        className="px-7 py-2 bg-yellow-400 rounded-3xl text-slate-800 max-md:px-5 hover:bg-yellow-300 transition-colors"
        aria-label={submitLabel === "NEXT" ? "Next step" : "Create account"}
      >
        {submitLabel.toUpperCase()}
      </button>
    </div>
  );
};
