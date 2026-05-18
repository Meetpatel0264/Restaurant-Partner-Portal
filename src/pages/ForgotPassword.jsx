// src/pages/ForgotPassword.jsx

import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {

  const navigate = useNavigate();

  const handleSubmit = (e) => {

    e.preventDefault();

    alert("Coming Soon");
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-[#1b1b1b] rounded-3xl p-8 border border-white/5">

        <h1 className="text-4xl font-bold text-white mb-3">
          Forgot Password
        </h1>

        <p className="text-gray-400 mb-8">
          Reset password UI only
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="email"
            placeholder="Enter Email"
            className="zomatoInput"
          />

          <button className="primaryBtn">

            Send Reset Link

          </button>

        </form>

        <p
          onClick={() =>
            navigate("/")
          }
          className="text-center text-red-400 mt-6 cursor-pointer"
        >

          Back to Login

        </p>

      </div>

    </div>
  );
}