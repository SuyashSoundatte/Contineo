import React, { useEffect, useRef } from "react";
import { ButtonComponent } from "../components/component.js";

const Modal = ({ isOpen, onClose, onConfirm, teacher }) => {
  const modalRef = useRef(null);

  // Close modal when 'Esc' key is pressed
  useEffect(() => {
    const handleEscClose = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscClose);
    }

    // Clean up listener when modal closes or component unmounts
    return () => {
      window.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen, onClose]);

  // Focus modal when it opens
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null; // Don't render modal if it's not open

  return (
    <div
      ref={modalRef}
      tabIndex="-1" // Make modal focusable
      className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform scale-100 transition-all">
        <div className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
            Confirm Allocation
          </h2>

          <div className="space-y-4 bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-[auto,1fr] gap-x-3 items-baseline">
              <span className="text-gray-500 font-medium">Teacher Name:</span>
              <span className="text-gray-900">{teacher?.fname || "N/A"} {teacher?.lname || "N/A"}</span>

              <span className="text-gray-500 font-medium">Teacher ID:</span>
              <span className="text-gray-900 font-mono">{teacher?.user_id || "N/A"}</span>

              <span className="text-gray-500 font-medium">Email:</span>
              <span className="text-gray-900 break-all">{teacher?.email || "N/A"}</span>

              <span className="text-gray-500 font-medium">Subject:</span>
              <span className="text-gray-900">{teacher?.sub || "N/A"}</span>
            </div>
          </div>

          <p className="text-gray-600">
            Are you sure you want to allocate this teacher?
          </p>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50/80 border-t rounded-b-xl">
          <ButtonComponent
            className="px-4 py-2 text-black border border-gray-300 rounded-lg
                        transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200"
            onClick={onClose}
          >
            Cancel
          </ButtonComponent>
          <ButtonComponent
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 
                       active:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={onConfirm}
          >
            Confirm
          </ButtonComponent>
        </div>
      </div>
    </div>
  );
};

export default Modal;
