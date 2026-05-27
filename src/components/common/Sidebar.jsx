import {
  FiMenu,
  FiPlus,
  FiShoppingBag,
  FiLock,
  FiLogOut,
  FiX,
} from "react-icons/fi";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useState } from "react";

import { logout } from "../../features/authSlice";

import EditProfileModal from "./EditProfileModal";

export default function Sidebar({
  closeSidebar,
}) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const [openProfile, setOpenProfile] =
    useState(false);

  const { user } =
    useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());

    if (closeSidebar) {
      closeSidebar();
    }

    navigate("/");
  };

  const handleNavigate = (path) => {
    navigate(path);

    if (closeSidebar) {
      closeSidebar();
    }
  };

  const handleProfileOpen = () => {
    setOpenProfile(true);
  };

  const menus = [
    {
      name: "Dashboard",
      icon: <FiMenu size={20} />,
      path: "/dashboard",
    },
    {
      name: "Orders",
      icon: <FiShoppingBag size={20} />,
      path: "/orders",
    },
    {
      name: "Add Food",
      icon: <FiPlus size={20} />,
      path: "/foods",
    },
    {
      name: "Change Password",
      icon: <FiLock size={20} />,
      path: "/change-password",
    },
  ];

  return (
    <>
      <EditProfileModal
        open={openProfile}
        setOpen={setOpenProfile}
      />

      <div className="w-72 bg-[#171717] border-r border-white/5 flex flex-col justify-between h-screen">

        <div>

          <div className="px-8 py-8 border-b border-white/5">

            <div className="flex items-center justify-between">

              <div>
                <h1 className="text-4xl font-bold text-red-500">
                  Zomato
                </h1>

                <p className="text-gray-400 mt-2">
                  Restaurant Partner
                </p>
              </div>

              <button
                onClick={() => {
                  if (closeSidebar) {
                    closeSidebar();
                  }
                }}
                className="lg:hidden text-white text-2xl"
              >
                <FiX />
              </button>

            </div>

          </div>

          <div className="p-5 space-y-3">

            {menus.map((menu) => (
              <button
                key={menu.path}
                onClick={() =>
                  handleNavigate(menu.path)
                }
                className={`w-full px-5 py-4 rounded-2xl flex items-center gap-3 transition font-semibold
                ${
                  location.pathname === menu.path
                    ? "bg-red-500 text-white"
                    : "bg-[#222] hover:bg-[#2b2b2b] text-white"
                }`}
              >
                {menu.icon}
                {menu.name}
              </button>
            ))}

          </div>

        </div>

        <div className="p-5 border-t border-white/5">

          <div
            onClick={handleProfileOpen}
            className="flex items-center gap-4 mb-5 cursor-pointer"
          >

            <img
              src={
                user?.image ||
                "/user.png"
              }
              alt="profile"
              className="w-14 h-14 rounded-full object-cover border-2 border-red-500"
            />

            <div>
              <h2 className="font-semibold text-white">
                {user?.name}
              </h2>

              <p className="text-gray-400 text-sm">
                Restaurant Owner
              </p>
            </div>

          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 transition py-3 rounded-2xl flex items-center justify-center gap-2 text-white font-semibold"
          >
            <FiLogOut />
            Logout
          </button>

        </div>

      </div>
    </>
  );
}