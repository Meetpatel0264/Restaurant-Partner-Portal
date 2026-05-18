import {
  FiMenu,
  FiPlus,
  FiShoppingBag,
  FiLock,
  FiLogOut,
} from "react-icons/fi";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import { logout } from "../../features/authSlice";

export default function Sidebar() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } =
    useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const menus = [
    {
      name: "Dashboard",
      icon: <FiMenu />,
      path: "/dashboard",
    },
    {
      name: "Orders",
      icon: <FiShoppingBag />,
      path: "/orders",
    },
    {
      name: "Add Food",
      icon: <FiPlus />,
      path: "/foods",
    },
    {
      name: "Change Password",
      icon: <FiLock />,
      path: "/change-password",
    },
  ];

  return (
    <div className="hidden lg:flex w-72 bg-[#171717] border-r border-white/5 flex-col justify-between min-h-screen sticky top-0">
      <div>
        <div className="px-8 py-8 border-b border-white/5">
          <h1 className="text-4xl font-bold text-red-500">
            Zomato
          </h1>
          <p className="text-gray-400 mt-2">
            Restaurant Partner
          </p>
        </div>
        <div className="p-5 space-y-3">
          {
            menus.map((menu) => (

              <button
                key={menu.path}
                onClick={() =>
                  navigate(menu.path)
                }
                className={`w-full px-5 py-4 rounded-2xl flex items-center gap-3 transition font-semibold
                  
                  ${location.pathname ===
                    menu.path
                    ? "bg-red-500 text-white"
                    : "bg-[#222] hover:bg-[#2b2b2b] text-white"
                  }                  
                  `}
              >
                {menu.icon}
                {menu.name}
              </button>
            ))
          }
        </div>
      </div>
      <div className="p-5 border-t border-white/5">
        <div className="flex items-center gap-4 mb-5">
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
          className="w-full bg-red-500 hover:bg-red-600 transition py-3 rounded-2xl flex items-center justify-center gap-2"
        >
          <FiLogOut />
          Logout
        </button>
      </div>
    </div>
  );
}