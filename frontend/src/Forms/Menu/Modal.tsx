// Modal.tsx
import React from "react";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ children, onClose }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    onClick={onClose}
  >
    <div
      className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full relative"
      onClick={e => e.stopPropagation()} // Prevent closing when clicking inside the modal
    >
      {children}
    </div>
  </div>
);