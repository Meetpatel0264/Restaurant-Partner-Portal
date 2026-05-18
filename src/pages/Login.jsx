import {
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  loginUser,
} from "../features/authSlice";

import {
  useNavigate,
} from "react-router-dom";

export default function Login() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, error } =
    useSelector((state) => state.auth);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleLogin = async (
    e
  ) => {

    e.preventDefault();

    const res = await dispatch(
      loginUser(formData)
    );

    if (
      res.meta.requestStatus ===
      "fulfilled"
    ) {

      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex">

      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-red-600 to-orange-500 items-center justify-center p-16">

        <div>

          <h1 className="text-7xl font-bold text-white">
            Zomato
          </h1>

          <p className="text-white/90 mt-5 text-xl">
            Restaurant Partner Dashboard
          </p>

        </div>

      </div>

      <div className="flex-1 flex items-center justify-center px-6">

        <div className="w-full max-w-md">

          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome Back
          </h1>

          <p className="text-gray-400 mb-8">
            Login to continue
          </p>

          {
            error && (
              <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-xl mb-5">
                {error}
              </div>
            )
          }

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

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

            <p
              onClick={() =>
                navigate(
                  "/forgot-password"
                )
              }
              className="text-red-400 text-right cursor-pointer"
            >

              Forgot Password?

            </p>

            <button className="primaryBtn">

              {
                loading
                  ? "Loading..."
                  : "Login"
              }

            </button>

          </form>

          <p
            onClick={() =>
              navigate("/signup")
            }
            className="text-center text-gray-400 mt-6 cursor-pointer"
          >

            Don’t have account?
            {" "}
            <span className="text-red-400">
              Signup
            </span>

          </p>

        </div>

      </div>

    </div>
  );
}