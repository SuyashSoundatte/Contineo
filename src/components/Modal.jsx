import React from "react";
import {
  ButtonComponent
} from '../components/component.js'

const Modal = ({ isOpen, onClose, onConfirm, teacher }) => {
  if (!isOpen) return null; // Don't render if modal is not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-xl font-bold mb-4">Confirm Allocation</h2>

        <div className="mb-4">
          <p><strong>Teacher Name:</strong> {teacher?.fname} {teacher?.lname}</p>
          <p><strong>Teacher ID:</strong> {teacher?.user_id}</p>
          <p><strong>Email:</strong> {teacher?.email}</p>
          <p><strong>Subject:</strong> {teacher?.sub}</p>
        </div>

        <p className="text-gray-600 mb-6">
          Are you sure you want to allocate this teacher?
        </p>

        <div className="flex justify-end space-x-4">
          <ButtonComponent
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </ButtonComponent>
          <ButtonComponent
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
