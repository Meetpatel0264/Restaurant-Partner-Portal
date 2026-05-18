// src/pages/Signup.jsx

import {
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  registerUser,
} from "../features/authSlice";

import {
  useNavigate,
} from "react-router-dom";

export default function Signup() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading } =
    useSelector((state) => state.auth);

  const [preview, setPreview] =
    useState("");

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      image: null,
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleImage = (e) => {

    const file =
      e.target.files[0];

    if (!file) return;

    setFormData({
      ...formData,
      image: file,
    });

    setPreview(
      URL.createObjectURL(file)
    );
  };

  const handleSignup = async (
    e
  ) => {

    e.preventDefault();

    const data =
      new FormData();

    Object.keys(formData).forEach(
      (key) => {
        data.append(
          key,
          formData[key]
        );
      }
    );

    const res = await dispatch(
      registerUser(data)
    );

    if (
      res.meta.requestStatus ===
      "fulfilled"
    ) {

      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-5xl bg-[#1b1b1b] rounded-3xl overflow-hidden grid lg:grid-cols-2">

        <div className="hidden lg:flex bg-gradient-to-br from-red-600 to-orange-500 p-16 items-center">

          <div>

            <h1 className="text-6xl font-bold text-white">
              Join Zomato
            </h1>

            <p className="text-white/90 mt-6 text-lg">
              Create your restaurant partner account
            </p>

          </div>

        </div>

        <div className="p-8">

          <h1 className="text-4xl font-bold text-white mb-8">
            Create Account
          </h1>

          <form
            onSubmit={handleSignup}
            className="space-y-5"
          >

            <div className="flex justify-center">

              <label className="cursor-pointer">

                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-red-500 bg-[#222]">

                  {
                    preview ? (

                      <img
                        src={preview}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />

                    ) : null
                  }

                </div>

                <input
                  type="file"
                  className="hidden"
                  onChange={handleImage}
                />

              </label>

            </div>

            <input
              type="text"
              name="name"
              placeholder="Restaurant Name"
              onChange={handleChange}
              className="zomatoInput"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="zomatoInput"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="zomatoInput"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              className="zomatoInput"
            />

            <textarea
              rows="4"
              name="address"
              placeholder="Address"
              onChange={handleChange}
              className="zomatoInput resize-none"
            ></textarea>

            <button className="primaryBtn">

              {
                loading
                  ? "Creating..."
                  : "Create Account"
              }

            </button>

          </form>

          <p
            onClick={() =>
              navigate("/")
            }
            className="text-center text-gray-400 mt-6 cursor-pointer"
          >

            Already have account?
            {" "}
            <span className="text-red-400">
              Login
            </span>

          </p>

        </div>

      </div>

    </div>
  );
}