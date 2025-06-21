import React from 'react';

interface FormActionsProps {
  onCancel: () => void;
  onAdd: () => void;
}

export const FormActions: React.FC<FormActionsProps> = ({ onCancel, onAdd }) => {
  return (
    <footer className="flex gap-4 self-center mt-7 w-full text-3xl whitespace-nowrap max-w-[356px]">
      <button
        type="button"
        onClick={onCancel}
        className="px-5 py-2 text-orange-50 rounded-3xl bg-slate-800 font-bold"
      >
        CANCEL
      </button>
      <button
        type="submit"
        onClick={onAdd}
        className="px-12 py-2 bg-yellow-400 rounded-3xl text-slate-800 font-bold"
      >
        ADD
      </button>
    </footer>
  );
};
