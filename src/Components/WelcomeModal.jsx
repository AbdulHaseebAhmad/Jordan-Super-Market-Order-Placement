import React from "react";
import { useDispatch } from "react-redux";
import { modalActions } from "../store/modal-slice";

export default function WelcomeModal() {

    const dispatch = useDispatch();
    const closeMessageModal = () => {
        dispatch(modalActions.toggleWelcomeModal());
    }
  return (
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <button
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={closeMessageModal}
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <div class="text-center mb-4">
          <h2 class="text-xl font-bold">Message</h2>
        </div>
        <div class="text-center">
          <p>Welcome to our website! We hope you enjoy your stay.</p>
        </div>
      </div>
    </div>
  );
}
